import React, { useState, useEffect } from 'react';

// Estimate Template - Oak Angel CSI Structure
const ESTIMATE_TEMPLATE = {
  categories: [
    { id: 'general', name: '01 - General Requirements', items: [
      { id: 'arch-fees', name: 'Architectural Fees', desc: 'Plans, Details, Permitting Docs' },
      { id: 'civil-eng', name: 'Civil Engineering', desc: 'Survey, Site Plan, Water/Sewer' },
      { id: 'eng-fees', name: 'Engineering Fees', desc: 'Structural engineering' },
      { id: 'supervising-eng', name: 'Supervising Engineer', desc: 'On-site engineer fees' },
      { id: 'tree-survey', name: 'Tree Survey', desc: 'Licensed arborist survey' },
      { id: 'permitting', name: 'Permitting Fees', desc: 'Plan Review, Permits' },
      { id: 'insurance', name: 'Insurance/Licenses/Taxes', desc: 'GL, Licenses, Taxes' },
      { id: 'admin', name: 'Administrative Fees', desc: 'Coordination, Payroll' },
      { id: 'pm-fees', name: 'Project Management', desc: 'PM and CM fees' },
      { id: 'site-prep', name: 'Site Prep', desc: 'Clearing, Grading, Fill' },
      { id: 'tree-removal', name: 'Tree Removal', desc: 'Tree removal/trimming' },
      { id: 'portolet', name: 'Portolet Rental', desc: 'Portable restrooms' },
      { id: 'sewer-conn', name: 'Sewer/Utility Trenching', desc: 'Connections, trenching' },
      { id: 'equipment', name: 'Equipment Rental', desc: 'Excavation, cranes, pumps' },
      { id: 'silt-fence', name: 'Silt Fencing', desc: 'Stormwater requirements' },
      { id: 'dumpsters', name: 'Dumpsters/Debris', desc: 'Removal, dump fees' },
      { id: 'septic', name: 'Septic System', desc: 'Design, DHEC, install' },
      { id: 'cleaning', name: 'Construction Cleaning', desc: 'Ongoing and final' }
    ]},
    { id: 'foundation', name: '02 - Foundation/Concrete', items: [
      { id: 'footings-labor', name: 'Footings - Labor', desc: 'Labor to install' },
      { id: 'footings-mat', name: 'Footings - Materials', desc: 'Gravel, rebar, concrete' },
      { id: 'cmu-piers', name: 'CMU Piers', desc: 'Elevated home piers' },
      { id: 'slab', name: 'Foundation/Driveway Slab', desc: 'Prep, forms, concrete' },
      { id: 'stucco-ext', name: 'Stucco Finishing', desc: 'Exterior finishes' },
      { id: 'pile-driving', name: 'Pile Driving', desc: 'Marine grade pilings' }
    ]},
    { id: 'framing', name: '03 - Framing/Lumber', items: [
      { id: 'basement-frame', name: 'Basement Framing', desc: 'Materials and fasteners' },
      { id: 'breakaway', name: 'Break Away Walls', desc: 'Flood zone walls' },
      { id: '1st-ijoist', name: '1st Floor I-Joists', desc: 'Engineered joists' },
      { id: '1st-frame', name: '1st Floor Framing', desc: 'Framing with decking' },
      { id: '2nd-ijoist', name: '2nd Floor I-Joists', desc: 'Engineered joists' },
      { id: '2nd-frame', name: '2nd Floor Framing', desc: 'Framing with decking' },
      { id: 'roof-frame', name: 'Roof Framing', desc: 'Stick-built framing' },
      { id: 'trusses', name: 'Roof Truss Package', desc: 'Engineered trusses' },
      { id: 'roof-sheath', name: 'Roof Sheathing', desc: 'Sheathing materials' },
      { id: 'int-stairs', name: 'Interior Stairs', desc: 'Stair framing' },
      { id: 'frame-labor', name: 'Total Framing Labor', desc: 'All framing labor' }
    ]},
    { id: 'exterior', name: '04 - Exterior', items: [
      { id: 'windows-mat', name: 'Windows - Materials', desc: 'Window units' },
      { id: 'windows-labor', name: 'Window Installation', desc: 'Install labor' },
      { id: 'window-protection', name: 'Windborne Protection', desc: 'For non-impact' },
      { id: 'garage-doors', name: 'Garage Doors/Openers', desc: 'Doors and openers' },
      { id: 'ext-doors-labor', name: 'Ext Door Installation', desc: 'Install labor' },
      { id: 'siding-mat', name: 'Hardie Siding/Trim', desc: 'Siding, fascia, soffit' },
      { id: 'siding-labor', name: 'Siding Installation', desc: 'Install labor' },
      { id: 'ext-paint', name: 'Exterior Paint', desc: 'Prep and paint' },
      { id: 'insulation-mat', name: 'Insulation Materials', desc: 'Walls, attic' },
      { id: 'insulation-labor', name: 'Insulation Install', desc: 'Install labor' },
      { id: 'misc-ext', name: 'Misc Exterior', desc: 'Other exterior' }
    ]},
    { id: 'roofing', name: '05 - Roofing', items: [
      { id: 'roof-mat', name: 'Roof Materials', desc: 'Metal or shingle' },
      { id: 'roof-labor', name: 'Roofing Labor', desc: 'Install labor' },
      { id: 'gutters', name: 'Gutter System', desc: 'Gutters, downspouts' }
    ]},
    { id: 'interiors', name: '06 - Interiors', items: [
      { id: 'int-doors-mat', name: 'Interior Doors/Hardware', desc: 'Doors, hinges, hardware' },
      { id: 'int-doors-labor', name: 'Door Installation', desc: 'Install labor' },
      { id: 'drywall-walls', name: 'Drywall - Walls', desc: '1/2" Level 4 finish' },
      { id: 'drywall-ceiling', name: 'Drywall - Ceiling', desc: '5/8" Level 4 finish' },
      { id: 'prime-int', name: 'Prime Interior', desc: 'Walls and ceilings' },
      { id: 'paint-int', name: 'Paint Interior', desc: 'Builders grade' },
      { id: 'cabinetry', name: 'Kitchen Cabinetry', desc: 'Cabinets installed' },
      { id: 'countertops', name: 'Countertops', desc: 'Materials and install' },
      { id: 'kitchen-sink', name: 'Kitchen Sink/Faucet', desc: 'Sink, faucet, disposal' },
      { id: 'showers', name: 'Showers', desc: 'Shower construction' },
      { id: 'shower-glass', name: 'Shower Glass', desc: 'Glass enclosures' },
      { id: 'tubs', name: 'Bath Tubs', desc: 'Tubs and tub-showers' },
      { id: 'vanities', name: 'Vanities', desc: 'Vanities installed' },
      { id: 'bath-sinks', name: 'Bath Sinks/Faucets', desc: 'Sinks and faucets' },
      { id: 'tile', name: 'Tile Work', desc: 'Floors and backsplashes' },
      { id: 'bath-hardware', name: 'Bath Hardware', desc: 'Towel bars, TP holders' },
      { id: 'mirrors', name: 'Mirrors', desc: 'Bath mirrors' },
      { id: 'vanity-tops', name: 'Vanity Tops', desc: 'Stone tops' },
      { id: 'int-trim', name: 'Interior Trim', desc: 'Baseboards, molding' },
      { id: 'shelving', name: 'Shelving Systems', desc: 'Closets, pantry' }
    ]},
    { id: 'hvac', name: '07 - HVAC', items: [
      { id: 'hvac-system', name: 'Whole Home HVAC', desc: 'Complete system' },
      { id: 'heaters', name: 'Water/Pool Heaters', desc: 'Heater units' }
    ]},
    { id: 'plumbing', name: '08 - Plumbing/Gas', items: [
      { id: 'gas-plumbing', name: 'Gas Plumbing', desc: 'Gas lines, stub outs' },
      { id: 'plumbing', name: 'Residential Plumbing', desc: 'Water, waste - no fixtures' }
    ]},
    { id: 'electrical', name: '09 - Electrical', items: [
      { id: 'temp-power', name: 'Temporary Power', desc: 'Temp power pole' },
      { id: 'electrical', name: 'Electrical - 200 AMP', desc: 'Whole home - no fixtures' }
    ]},
    { id: 'allowances', name: '10 - Allowances', items: [
      { id: 'flooring', name: 'Flooring', desc: 'Living, bedrooms, closets' },
      { id: 'flooring-install', name: 'Flooring Install', desc: 'Install labor' },
      { id: 'trim-allowance', name: 'Trim/Molding', desc: 'Upgraded trim' },
      { id: 'cabinet-allowance', name: 'Cabinet Allowance', desc: 'Kitchen cabinets' },
      { id: 'refrigerator', name: 'Refrigerator', desc: 'Appliance' },
      { id: 'stove', name: 'Stove', desc: 'Appliance' },
      { id: 'oven-micro', name: 'Oven/Microwave', desc: 'Appliances' },
      { id: 'misc-appliances', name: 'Misc Appliances', desc: 'Other appliances' },
      { id: 'appliance-install', name: 'Appliance Install', desc: 'Install labor' },
      { id: 'hood-vent', name: 'Hood Vent', desc: 'Kitchen hood' },
      { id: 'ext-lighting', name: 'Exterior Lighting', desc: 'Outdoor fixtures' },
      { id: 'int-lighting', name: 'Interior Lighting', desc: 'Indoor fixtures' },
      { id: 'ext-fans', name: 'Exterior Fans', desc: 'Porch fans' },
      { id: 'int-fans', name: 'Interior Fans', desc: 'Ceiling fans' },
      { id: 'fixtures', name: 'Fixtures/Hardware', desc: 'Pulls, knobs' },
      { id: 'blinds', name: 'Blinds', desc: 'Window treatments' }
    ]},
    { id: 'upgrades', name: '11 - Upgrades', items: [
      { id: 'deck-composite', name: 'Composite Decking', desc: 'Upgrade from P/T' },
      { id: 'deck-ipe', name: 'IPE Decking', desc: 'Premium decking' },
      { id: 'paint-int-upgrade', name: 'Interior Paint Upgrade', desc: 'Premium paint' },
      { id: 'paint-ext-upgrade', name: 'Exterior Paint Upgrade', desc: 'Premium paint' },
      { id: 'black-windows', name: 'Black Windows/Doors', desc: 'Exterior black' },
      { id: 'insulation-upgrade', name: 'Insulation Upgrade', desc: 'Premium insulation' },
      { id: 'tile-upgrade', name: 'Tile Upgrade', desc: 'Premium tile' },
      { id: 'trim-upgrade', name: 'Trim Upgrade', desc: 'Premium trim' }
    ]}
  ]
};

// Local Storage helpers
const saveToStorage = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.error('Storage error:', e); }
};
const loadFromStorage = (key, defaultValue) => {
  try { const data = localStorage.getItem(key); return data ? JSON.parse(data) : defaultValue; } catch (e) { return defaultValue; }
};

export default function App() {
  const [tab, setTab] = useState('leads');
  const [leads, setLeads] = useState(() => loadFromStorage('oakangel_leads', []));
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showAddComm, setShowAddComm] = useState(false);
  const [estimates, setEstimates] = useState(() => loadFromStorage('oakangel_estimates', []));
  const [selectedEst, setSelectedEst] = useState(null);
  const [showNewEst, setShowNewEst] = useState(false);
  const [estItems, setEstItems] = useState({});
  const [estMode, setEstMode] = useState('quick');
  const [newLead, setNewLead] = useState({ name: '', phone: '', email: '', address: '', projectType: 'Custom Build', status: 'New', source: 'Website', notes: '' });
  const [newComm, setNewComm] = useState({ type: 'Phone', notes: '' });

  // Persist data
  useEffect(() => { saveToStorage('oakangel_leads', leads); }, [leads]);
  useEffect(() => { saveToStorage('oakangel_estimates', estimates); }, [estimates]);

  const projectTypes = ['Custom Build', 'Full Remodel', 'Kitchen Remodel', 'Bathroom Remodel', 'Addition', 'Roofing', 'Siding', 'Restoration', 'Mother-In-Law Suite', 'Other'];
  const statuses = ['New', 'Contacted', 'Meeting Scheduled', 'Estimate Sent', 'Negotiating', 'Won', 'Lost'];
  const sources = ['Website', 'Referral', 'Google', 'Facebook', 'Houzz', 'HomeAdvisor', 'Drive-by', 'Other'];

  const formatCurrency = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n || 0);
  const getStatusColor = s => ({ New: '#2563eb', Contacted: '#7c3aed', 'Meeting Scheduled': '#0891b2', 'Estimate Sent': '#ca8a04', Negotiating: '#ea580c', Won: '#16a34a', Lost: '#64748b' }[s] || '#64748b');

  const calcItem = item => {
    const cost = (item?.cost || 0) * (item?.qty || 1);
    const op = cost * 0.065;
    const profit = (cost + op) * 0.20;
    return { cost, op, profit, total: cost + op + profit };
  };

  const calcTotals = () => {
    let cost = 0, op = 0, profit = 0, total = 0;
    Object.values(estItems).forEach(i => { const t = calcItem(i); cost += t.cost; op += t.op; profit += t.profit; total += t.total; });
    return { cost, op, profit, total };
  };

  const addLead = () => {
    if (!newLead.name || !newLead.phone) return;
    const lead = { ...newLead, id: Date.now(), createdAt: new Date().toISOString().split('T')[0], communications: newLead.notes ? [{ date: new Date().toISOString().split('T')[0], type: 'Note', notes: newLead.notes }] : [] };
    setLeads([lead, ...leads]);
    setNewLead({ name: '', phone: '', email: '', address: '', projectType: 'Custom Build', status: 'New', source: 'Website', notes: '' });
    setShowAddLead(false);
  };

  const addComm = () => {
    if (!newComm.notes || !selectedLead) return;
    const updated = leads.map(l => l.id === selectedLead.id ? { ...l, communications: [{ date: new Date().toISOString().split('T')[0], ...newComm }, ...l.communications] } : l);
    setLeads(updated);
    setSelectedLead(updated.find(l => l.id === selectedLead.id));
    setNewComm({ type: 'Phone', notes: '' });
    setShowAddComm(false);
  };

  const updateLeadStatus = (status) => {
    const updated = leads.map(l => l.id === selectedLead.id ? { ...l, status } : l);
    setLeads(updated);
    setSelectedLead({ ...selectedLead, status });
  };

  const createEst = leadId => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    const est = { id: Date.now(), leadId, leadName: lead.name, address: lead.address, projectType: lead.projectType, createdAt: new Date().toISOString().split('T')[0], items: {} };
    setEstimates([est, ...estimates]);
    setSelectedEst(est);
    setEstItems({});
    setShowNewEst(false);
    setTab('estimates');
  };

  const saveEst = () => {
    if (!selectedEst) return;
    const totals = calcTotals();
    const updated = estimates.map(e => e.id === selectedEst.id ? { ...e, items: estItems, totals } : e);
    setEstimates(updated);
    setSelectedEst({ ...selectedEst, items: estItems, totals });
  };

  const deleteLead = (id) => {
    if (!confirm('Delete this lead?')) return;
    setLeads(leads.filter(l => l.id !== id));
    setSelectedLead(null);
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #e5e2dc', fontSize: '15px', boxSizing: 'border-box' };
  const btnGold = { padding: '12px 24px', backgroundColor: '#c9a227', color: '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' };
  const btnDark = { ...btnGold, backgroundColor: '#1a1a1a', color: '#fff' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f3', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://oakangelbuilders.com/wp-content/uploads/2024/01/oak-angel-builders-logo-min-jpeg-jpg.webp" alt="Oak Angel" style={{ height: '44px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <div>
            <h1 style={{ color: '#fff', fontSize: '17px', fontWeight: '600', margin: 0 }}>Construction Manager</h1>
            <p style={{ color: '#888', fontSize: '11px', margin: 0 }}>Oak Angel Builders</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['leads', 'estimates'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', backgroundColor: tab === t ? '#c9a227' : 'transparent', color: tab === t ? '#1a1a1a' : '#888', transition: 'all 0.2s' }}>
              {t === 'leads' ? '📋 Leads' : '📊 Estimates'}
            </button>
          ))}
        </div>
      </header>

      {/* LEADS TAB */}
      {tab === 'leads' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 72px)' }}>
          {/* Lead List */}
          <div style={{ width: '340px', backgroundColor: '#fff', borderRight: '1px solid #e5e2dc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e2dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Leads ({leads.length})</h2>
              <button onClick={() => setShowAddLead(true)} style={{ ...btnGold, padding: '10px 16px' }}>+ Add Lead</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {leads.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
                  <p>No leads yet. Add your first lead!</p>
                </div>
              ) : leads.map(lead => (
                <div key={lead.id} onClick={() => setSelectedLead(lead)} style={{ padding: '16px', borderBottom: '1px solid #f0ede8', cursor: 'pointer', backgroundColor: selectedLead?.id === lead.id ? '#faf8f5' : '#fff', borderLeft: selectedLead?.id === lead.id ? '4px solid #c9a227' : '4px solid transparent', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', fontSize: '15px' }}>{lead.name}</span>
                    <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', backgroundColor: `${getStatusColor(lead.status)}15`, color: getStatusColor(lead.status) }}>{lead.status}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{lead.projectType}</div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{lead.address?.split(',')[0] || 'No address'} • {lead.createdAt}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Detail */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            {selectedLead ? (
              <>
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>{selectedLead.name}</h2>
                      <p style={{ margin: '6px 0 0', color: '#666', fontSize: '16px' }}>{selectedLead.projectType}</p>
                    </div>
                    <select value={selectedLead.status} onChange={e => updateLeadStatus(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '2px solid #e5e2dc', fontWeight: '600', fontSize: '14px', color: getStatusColor(selectedLead.status) }}>
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '20px', borderTop: '1px solid #f0ede8' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Phone</label>
                      <a href={`tel:${selectedLead.phone}`} style={{ fontSize: '16px', color: '#2563eb', textDecoration: 'none' }}>{selectedLead.phone}</a>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Email</label>
                      <a href={`mailto:${selectedLead.email}`} style={{ fontSize: '16px', color: '#2563eb', textDecoration: 'none' }}>{selectedLead.email || '—'}</a>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Address</label>
                      <p style={{ margin: 0, fontSize: '16px' }}>{selectedLead.address || '—'}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Source</label>
                      <p style={{ margin: 0, fontSize: '16px' }}>{selectedLead.source}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Created</label>
                      <p style={{ margin: 0, fontSize: '16px' }}>{selectedLead.createdAt}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <button onClick={() => createEst(selectedLead.id)} style={{ ...btnGold, flex: 1 }}>Create Estimate</button>
                    <button onClick={() => deleteLead(selectedLead.id)} style={{ padding: '12px 20px', border: '2px solid #dc2626', borderRadius: '8px', backgroundColor: '#fff', color: '#dc2626', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                  </div>
                </div>

                {/* Communication Log */}
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Communication Log</h3>
                    <button onClick={() => setShowAddComm(true)} style={btnDark}>+ Add Entry</button>
                  </div>
                  {selectedLead.communications.length === 0 ? (
                    <p style={{ color: '#999', textAlign: 'center', padding: '30px' }}>No communications logged yet</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedLead.communications.map((c, i) => (
                        <div key={i} style={{ padding: '16px', backgroundColor: '#faf8f5', borderRadius: '10px', borderLeft: '4px solid #c9a227' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#666', backgroundColor: '#e5e2dc', padding: '4px 10px', borderRadius: '6px' }}>{c.type}</span>
                            <span style={{ fontSize: '12px', color: '#999' }}>{c.date}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{c.notes}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                <p style={{ fontSize: '16px' }}>Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ESTIMATES TAB */}
      {tab === 'estimates' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 72px)' }}>
          {/* Estimate List */}
          <div style={{ width: '300px', backgroundColor: '#fff', borderRight: '1px solid #e5e2dc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e2dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Estimates</h2>
              <button onClick={() => setShowNewEst(true)} style={{ ...btnGold, padding: '10px 14px' }}>+ New</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {estimates.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
                  <p>No estimates yet</p>
                </div>
              ) : estimates.map(e => (
                <div key={e.id} onClick={() => { setSelectedEst(e); setEstItems(e.items || {}); }} style={{ padding: '16px', borderBottom: '1px solid #f0ede8', cursor: 'pointer', backgroundColor: selectedEst?.id === e.id ? '#faf8f5' : '#fff', borderLeft: selectedEst?.id === e.id ? '4px solid #c9a227' : '4px solid transparent' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{e.leadName}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{e.projectType}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#999' }}>{e.createdAt}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: e.totals ? '#16a34a' : '#999' }}>{e.totals ? formatCurrency(e.totals.total) : 'Draft'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimate Detail */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8f6f3' }}>
            {selectedEst ? (
              <>
                <div style={{ padding: '16px 24px', backgroundColor: '#fff', borderBottom: '1px solid #e5e2dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{selectedEst.leadName}</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>{selectedEst.address || selectedEst.projectType}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', backgroundColor: '#f0ede8', borderRadius: '8px', padding: '4px' }}>
                      {['quick', 'full'].map(m => (
                        <button key={m} onClick={() => setEstMode(m)} style={{ padding: '8px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', backgroundColor: estMode === m ? '#fff' : 'transparent', color: estMode === m ? '#1a1a1a' : '#666', boxShadow: estMode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                          {m === 'quick' ? 'Quick' : 'Full Detail'}
                        </button>
                      ))}
                    </div>
                    <button onClick={saveEst} style={btnDark}>Save</button>
                  </div>
                </div>

                {/* Totals Bar */}
                <div style={{ padding: '14px 24px', backgroundColor: '#1a1a1a', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#888', display: 'block' }}>Builder Cost</span>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{formatCurrency(calcTotals().cost)}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#888', display: 'block' }}>Operating (6.5%)</span>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{formatCurrency(calcTotals().op)}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#888', display: 'block' }}>Profit (20%)</span>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#16a34a' }}>{formatCurrency(calcTotals().profit)}</span>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span style={{ fontSize: '11px', color: '#c9a227', display: 'block' }}>Customer Price</span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#c9a227' }}>{formatCurrency(calcTotals().total)}</span>
                  </div>
                </div>

                {/* Estimate Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
                  {ESTIMATE_TEMPLATE.categories.map(cat => {
                    const catTotal = cat.items.reduce((sum, item) => sum + calcItem(estItems[item.id] || {}).total, 0);
                    return (
                      <div key={cat.id} style={{ backgroundColor: '#fff', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ padding: '14px 18px', backgroundColor: '#faf8f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0ede8' }}>
                          <span style={{ fontWeight: '600', fontSize: '14px' }}>{cat.name}</span>
                          <span style={{ fontWeight: '600', fontSize: '14px', color: catTotal > 0 ? '#16a34a' : '#ccc' }}>{catTotal > 0 ? formatCurrency(catTotal) : '—'}</span>
                        </div>
                        <div style={{ padding: estMode === 'quick' ? '8px' : '0' }}>
                          {estMode === 'quick' ? (
                            cat.items.map(item => {
                              const data = estItems[item.id] || {};
                              const totals = calcItem(data);
                              return (
                                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 70px 100px', gap: '10px', padding: '10px', alignItems: 'center', borderRadius: '8px', backgroundColor: totals.cost > 0 ? '#f0fdf4' : 'transparent' }}>
                                  <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.name}</span>
                                  <input type="number" placeholder="Cost" value={data.cost || ''} onChange={e => setEstItems({ ...estItems, [item.id]: { ...data, cost: parseFloat(e.target.value) || 0 } })} style={{ padding: '8px', border: '1px solid #e5e2dc', borderRadius: '6px', fontSize: '13px', textAlign: 'right' }} />
                                  <input type="number" placeholder="Qty" value={data.qty || ''} onChange={e => setEstItems({ ...estItems, [item.id]: { ...data, qty: parseFloat(e.target.value) || 0 } })} style={{ padding: '8px', border: '1px solid #e5e2dc', borderRadius: '6px', fontSize: '13px', textAlign: 'right' }} />
                                  <span style={{ fontSize: '13px', fontWeight: '600', textAlign: 'right', color: totals.total > 0 ? '#16a34a' : '#ccc' }}>{totals.total > 0 ? formatCurrency(totals.total) : '—'}</span>
                                </div>
                              );
                            })
                          ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#faf8f5' }}>
                                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: '600' }}>Item</th>
                                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: '600', width: '180px' }}>Description</th>
                                  <th style={{ padding: '10px', textAlign: 'right', fontWeight: '600', width: '90px' }}>Cost</th>
                                  <th style={{ padding: '10px', textAlign: 'right', fontWeight: '600', width: '60px' }}>Qty</th>
                                  <th style={{ padding: '10px', textAlign: 'right', fontWeight: '600', width: '90px' }}>Builder $</th>
                                  <th style={{ padding: '10px', textAlign: 'right', fontWeight: '600', width: '80px' }}>Profit</th>
                                  <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', width: '100px' }}>Customer $</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cat.items.map(item => {
                                  const data = estItems[item.id] || {};
                                  const totals = calcItem(data);
                                  const hasValue = totals.cost > 0;
                                  return (
                                    <tr key={item.id} style={{ backgroundColor: hasValue ? '#f0fdf4' : '#fff' }}>
                                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0ede8' }}>{item.name}</td>
                                      <td style={{ padding: '10px', borderBottom: '1px solid #f0ede8', color: '#666', fontSize: '12px' }}>{item.desc}</td>
                                      <td style={{ padding: '6px', borderBottom: '1px solid #f0ede8' }}>
                                        <input type="number" value={data.cost || ''} onChange={e => setEstItems({ ...estItems, [item.id]: { ...data, cost: parseFloat(e.target.value) || 0 } })} style={{ width: '100%', padding: '6px', border: '1px solid #e5e2dc', borderRadius: '4px', fontSize: '12px', textAlign: 'right', boxSizing: 'border-box' }} />
                                      </td>
                                      <td style={{ padding: '6px', borderBottom: '1px solid #f0ede8' }}>
                                        <input type="number" value={data.qty || ''} onChange={e => setEstItems({ ...estItems, [item.id]: { ...data, qty: parseFloat(e.target.value) || 0 } })} style={{ width: '100%', padding: '6px', border: '1px solid #e5e2dc', borderRadius: '4px', fontSize: '12px', textAlign: 'right', boxSizing: 'border-box' }} />
                                      </td>
                                      <td style={{ padding: '10px', borderBottom: '1px solid #f0ede8', textAlign: 'right', color: hasValue ? '#1a1a1a' : '#ccc' }}>{hasValue ? formatCurrency(totals.cost) : '—'}</td>
                                      <td style={{ padding: '10px', borderBottom: '1px solid #f0ede8', textAlign: 'right', color: hasValue ? '#16a34a' : '#ccc' }}>{hasValue ? formatCurrency(totals.profit) : '—'}</td>
                                      <td style={{ padding: '10px 14px', borderBottom: '1px solid #f0ede8', textAlign: 'right', fontWeight: '600', color: hasValue ? '#1a1a1a' : '#ccc' }}>{hasValue ? formatCurrency(totals.total) : '—'}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <p style={{ fontSize: '16px' }}>Select or create an estimate</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {showAddLead && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: '600' }}>Add New Lead</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Customer Name *</label>
                <input value={newLead.name} onChange={e => setNewLead({ ...newLead, name: e.target.value })} style={inputStyle} placeholder="John Smith" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Phone *</label>
                  <input value={newLead.phone} onChange={e => setNewLead({ ...newLead, phone: e.target.value })} style={inputStyle} placeholder="843-555-0100" />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Email</label>
                  <input value={newLead.email} onChange={e => setNewLead({ ...newLead, email: e.target.value })} style={inputStyle} placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Property Address</label>
                <input value={newLead.address} onChange={e => setNewLead({ ...newLead, address: e.target.value })} style={inputStyle} placeholder="123 Main St, Charleston, SC" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Project Type</label>
                  <select value={newLead.projectType} onChange={e => setNewLead({ ...newLead, projectType: e.target.value })} style={inputStyle}>
                    {projectTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Lead Source</label>
                  <select value={newLead.source} onChange={e => setNewLead({ ...newLead, source: e.target.value })} style={inputStyle}>
                    {sources.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Initial Notes</label>
                <textarea value={newLead.notes} onChange={e => setNewLead({ ...newLead, notes: e.target.value })} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Details from first contact..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAddLead(false)} style={{ padding: '12px 24px', borderRadius: '8px', border: '2px solid #e5e2dc', backgroundColor: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: '500', color: '#666' }}>Cancel</button>
              <button onClick={addLead} style={btnGold}>Add Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD COMMUNICATION MODAL */}
      {showAddComm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '420px' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: '600' }}>Log Communication</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Type</label>
                <select value={newComm.type} onChange={e => setNewComm({ ...newComm, type: e.target.value })} style={inputStyle}>
                  {['Phone', 'Email', 'Text', 'In-Person', 'Video Call'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Notes</label>
                <textarea value={newComm.notes} onChange={e => setNewComm({ ...newComm, notes: e.target.value })} style={{ ...inputStyle, minHeight: '120px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="What was discussed..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAddComm(false)} style={{ padding: '12px 24px', borderRadius: '8px', border: '2px solid #e5e2dc', backgroundColor: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: '500', color: '#666' }}>Cancel</button>
              <button onClick={addComm} style={btnGold}>Save Entry</button>
            </div>
          </div>
        </div>
      )}

      {/* NEW ESTIMATE MODAL */}
      {showNewEst && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '420px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '600' }}>Create Estimate</h2>
            <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#666' }}>Select a lead:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {leads.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>Add a lead first</p>
              ) : leads.map(l => (
                <button key={l.id} onClick={() => createEst(l.id)} style={{ padding: '14px 16px', backgroundColor: '#faf8f5', border: '2px solid #e5e2dc', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>{l.name}</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{l.projectType} • {l.address?.split(',')[0] || 'No address'}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowNewEst(false)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #e5e2dc', backgroundColor: '#fff', cursor: 'pointer', fontSize: '15px', color: '#666' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
