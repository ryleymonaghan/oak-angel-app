import React, { useState } from 'react';

// Oak Angel Construction Management App - v2.0
// Modules: Lead Management, Estimates

// Estimate Template - Based on Oak Angel's CSI Structure
const ESTIMATE_TEMPLATE = {
  categories: [
    {
      id: 'general',
      name: '01 - General Requirements',
      description: 'Operating costs not including materials and labor',
      items: [
        { id: 'arch-fees', name: 'Architectural Fees', description: 'Plans, Details, Required Documents for Permitting' },
        { id: 'civil-eng', name: 'Civil Engineering', description: 'Surveying, Site Plan, Water/Sewer Plans, Elevation Certificate' },
        { id: 'eng-fees', name: 'Engineering Fees', description: 'Structural and other engineering fees' },
        { id: 'supervising-eng', name: 'Supervising Engineer Fees', description: 'Hourly fees when supervising engineer required on site' },
        { id: 'tree-survey', name: 'Tree Survey', description: 'Complete Tree Survey - Licensed arborist' },
        { id: 'permitting', name: 'Permitting Fees', description: 'Building Plan Review, Master Permit, Sub-Permitting' },
        { id: 'insurance', name: 'Insurance, Licenses, Taxes', description: 'General Liability, Licenses, Taxes (not Builders Risk)' },
        { id: 'admin', name: 'Administrative Fees', description: 'Project Coordination, Misc. Payroll expenses' },
        { id: 'pm-fees', name: 'Project Management Fees', description: 'Project and Construction Management' },
        { id: 'site-prep', name: 'Site Prep', description: 'Clearing, Grading, Organic Removal, Fill, Compaction' },
        { id: 'tree-removal', name: 'Tree Removal/Trimming', description: 'Tree removal other than site clearing' },
        { id: 'portolet', name: 'Portolet Rental', description: 'Portable restroom rental' },
        { id: 'sewer-conn', name: 'Sewer Connection & Utility Trenching', description: 'Connections, trenching, mechanical rough-in' },
        { id: 'equipment', name: 'Equipment Rental', description: 'Excavation, compaction, cranes, trenching, pumps' },
        { id: 'silt-fence', name: 'Silt Fencing & Tree Protection', description: 'Stormwater requirements' },
        { id: 'dumpsters', name: 'Dumpsters & Debris Removal', description: 'Dumpsters, removal, dump fees' },
        { id: 'septic', name: 'Septic Tank & Drainfield', description: 'Design, DHEC permitting, materials, installation' },
        { id: 'cleaning', name: 'Construction Cleaning', description: 'Ongoing and final cleaning' },
      ]
    },
    {
      id: 'foundation',
      name: '02 - Masonry/Concrete/Foundation',
      description: 'Foundation and concrete work',
      items: [
        { id: 'footings-labor', name: 'Footings - Labor', description: 'Labor to install footings' },
        { id: 'footings-mat', name: 'Footings - Materials', description: 'Gravel, Drainage, Reinforcement, Concrete' },
        { id: 'cmu-piers', name: 'CMU Piers', description: 'Piers for elevated homes, reinforcement, grouting' },
        { id: 'slab', name: 'Foundation & Driveway Slab', description: 'Prep, forms, mesh, rebar, concrete, labor, joints' },
        { id: 'stucco-ext', name: 'Stucco Finishing - Exterior', description: 'Exterior concrete finishes' },
        { id: 'pile-driving', name: 'Pile Driving', description: 'Marine grade pilings if required' },
      ]
    },
    {
      id: 'framing',
      name: '03 - Framing/Lumber/Decking',
      description: 'Structural framing and decking',
      items: [
        { id: 'basement-frame', name: 'Basement Framing - Materials', description: 'Framing materials and fasteners' },
        { id: 'breakaway', name: 'Basement Break Away Walls', description: 'Materials for flood zones' },
        { id: '1st-ijoist', name: '1st Floor I-Joist Package', description: 'Engineered floor joists' },
        { id: '1st-frame', name: '1st Floor Framing w/ Decking', description: 'Framing materials and fasteners' },
        { id: '2nd-ijoist', name: '2nd Floor I-Joist Package', description: 'Engineered floor joists' },
        { id: '2nd-frame', name: '2nd Floor Framing w/ Decking', description: 'Framing materials and fasteners' },
        { id: 'roof-frame', name: 'Roof Framing - No Trusses', description: 'Stick-built roof framing' },
        { id: 'trusses', name: 'Roof Truss Package', description: 'Engineered trusses' },
        { id: 'roof-sheath', name: 'Roof Sheathing', description: 'Sheathing materials' },
        { id: 'int-stairs', name: 'Interior Stairway Framing', description: 'Stair framing materials' },
        { id: 'frame-labor', name: 'Total Framing Labor', description: 'Labor to frame and sheath entire structure' },
      ]
    },
    {
      id: 'exterior',
      name: '04 - Exterior',
      description: 'Windows, doors, siding, insulation',
      items: [
        { id: 'windows-mat', name: 'Windows - Materials', description: 'Window units' },
        { id: 'windows-labor', name: 'Window Installation Labor', description: 'Cost to install windows' },
        { id: 'window-protection', name: 'Windborne Debris Protection', description: 'For non-impact windows - required for C/O' },
        { id: 'garage-doors', name: 'Garage Doors & Openers', description: 'Doors, openers, installation' },
        { id: 'ext-doors-labor', name: 'Exterior Door Installation', description: 'Labor for all exterior doors' },
        { id: 'siding-mat', name: 'Hardie Siding & Trim', description: 'Siding, corner trim, window trim, fascia, soffit' },
        { id: 'siding-labor', name: 'Siding Installation Labor', description: 'Labor to install siding' },
        { id: 'ext-paint', name: 'Exterior Paint', description: 'Prep and paint exterior' },
        { id: 'insulation-mat', name: 'Insulation - Materials', description: 'Walls, garage ceiling, attic/roof' },
        { id: 'insulation-labor', name: 'Insulation Installation', description: 'Labor to install insulation' },
        { id: 'misc-ext', name: 'Misc Exterior Finishes', description: 'Other exterior items' },
      ]
    },
    {
      id: 'roofing',
      name: '05 - Roofing',
      description: 'Roof system and gutters',
      items: [
        { id: 'roof-mat', name: 'Roof Materials', description: 'Metal or shingle system materials' },
        { id: 'roof-labor', name: 'Roofing Labor', description: 'Labor to install roof' },
        { id: 'gutters', name: 'Gutter System', description: 'Gutters, downspouts, in-ground termination' },
      ]
    },
    {
      id: 'interiors',
      name: '06 - Interiors',
      description: 'Interior finishes, kitchen, bathrooms',
      items: [
        { id: 'int-doors-mat', name: 'Interior Doors & Hardware', description: 'Doors, hinges, hardware' },
        { id: 'int-doors-labor', name: 'Interior Door Installation', description: 'Labor to install doors' },
        { id: 'drywall-walls', name: 'Drywall - Walls (1/2")', description: 'Level 4 finish walls' },
        { id: 'drywall-ceiling', name: 'Drywall - Ceiling (5/8")', description: 'Level 4 finish ceilings' },
        { id: 'prime-int', name: 'Prime Interior', description: 'Walls and ceilings' },
        { id: 'paint-int', name: 'Paint Interior', description: 'Builders grade painting' },
        { id: 'cabinetry', name: 'Kitchen Cabinetry', description: 'Cabinets and installation' },
        { id: 'countertops', name: 'Countertops', description: 'Materials and installation' },
        { id: 'kitchen-sink', name: 'Kitchen Sink/Faucet/Disposal', description: 'Sink, faucet, disposal, labor' },
        { id: 'showers', name: 'Showers', description: 'Mid-grade shower construction' },
        { id: 'shower-glass', name: 'Shower Glass', description: 'Glass enclosures' },
        { id: 'tubs', name: 'Bath Tubs', description: 'Free standing or tub-showers' },
        { id: 'vanities', name: 'Vanities', description: 'Vanities and installation' },
        { id: 'bath-sinks', name: 'Bathroom Sinks & Faucets', description: 'Sinks and faucets' },
        { id: 'tile', name: 'Tile Finishes', description: 'Flooring and backsplashes' },
        { id: 'bath-hardware', name: 'Bathroom Hardware', description: 'Pulls, towel racks, TP holders' },
        { id: 'mirrors', name: 'Mirrors', description: 'Bath mirrors' },
        { id: 'vanity-tops', name: 'Vanity Tops', description: 'Marble, granite, quartz' },
        { id: 'int-trim', name: 'Interior Trim', description: 'Baseboards, shoe molding' },
        { id: 'wallpaper-mat', name: 'Wallpaper - Materials', description: 'If applicable' },
        { id: 'wallpaper-labor', name: 'Wallpaper Installation', description: 'Labor to install' },
        { id: 'shelving', name: 'Shelving Systems', description: 'Closets, pantry, laundry' },
      ]
    },
    {
      id: 'hvac',
      name: '07 - HVAC',
      description: 'Heating and cooling systems',
      items: [
        { id: 'hvac-system', name: 'Whole Home HVAC', description: 'Complete HVAC system' },
        { id: 'heaters', name: 'Water/Pool Heaters', description: 'Water heaters, pool heaters' },
      ]
    },
    {
      id: 'plumbing',
      name: '08 - Plumbing/Gas',
      description: 'Plumbing and gas systems',
      items: [
        { id: 'gas-plumbing', name: 'Gas Plumbing', description: 'Water heater, fireplace, stove, grill, generator stub outs' },
        { id: 'plumbing', name: 'Residential Plumbing', description: 'Water supply, waste water - no fixtures' },
      ]
    },
    {
      id: 'electrical',
      name: '09 - Electrical',
      description: 'Electrical systems',
      items: [
        { id: 'temp-power', name: 'Temporary Power', description: 'Temp power and pole' },
        { id: 'electrical', name: 'Electrical Wiring - 200 AMP', description: 'Whole home electrical - no fixtures' },
      ]
    },
    {
      id: 'allowances',
      name: '10 - Allowances',
      description: 'Customer selection allowances',
      items: [
        { id: 'flooring', name: 'Flooring Allowance', description: 'Living spaces, bedrooms, closets' },
        { id: 'trim-allowance', name: 'Trim & Molding Allowance', description: 'Upgraded trim options' },
        { id: 'flooring-install', name: 'Flooring Installation', description: 'Labor to install' },
        { id: 'cabinet-allowance', name: 'Cabinet & Hardware Allowance', description: 'Kitchen cabinets' },
        { id: 'cabinet-install', name: 'Cabinet Installation', description: 'Labor to install' },
        { id: 'refrigerator', name: 'Refrigerator', description: 'Appliance allowance' },
        { id: 'stove', name: 'Stove', description: 'Appliance allowance' },
        { id: 'oven-micro', name: 'Oven/Microwave', description: 'Appliance allowance' },
        { id: 'misc-appliances', name: 'Misc Appliances', description: 'Other appliances' },
        { id: 'ext-appliances', name: 'Exterior Appliances', description: 'Grill, outdoor kitchen' },
        { id: 'appliance-install', name: 'Appliance Installation', description: 'Labor to install' },
        { id: 'hood-vent', name: 'Hood Vent', description: 'Kitchen hood' },
        { id: 'ext-lighting', name: 'Exterior Lighting', description: 'Outdoor fixtures' },
        { id: 'int-lighting', name: 'Interior Lighting', description: 'Indoor fixtures' },
        { id: 'ext-fans', name: 'Exterior Fans', description: 'Porch fans' },
        { id: 'int-fans', name: 'Interior Fans', description: 'Ceiling fans' },
        { id: 'fixtures', name: 'Fixtures/Pulls/Knobs', description: 'Hardware allowance' },
        { id: 'blinds', name: 'Blinds', description: 'Window treatments' },
      ]
    },
    {
      id: 'upgrades',
      name: '11 - Upgrades',
      description: 'Optional upgrades',
      items: [
        { id: 'deck-composite', name: 'Upgrade: P/T to Composite Decking', description: 'Decking upgrade' },
        { id: 'deck-ipe', name: 'Upgrade: P/T to IPE Decking', description: 'Premium decking' },
        { id: 'paint-int-upgrade', name: 'Interior Paint Upgrade', description: 'Premium paint' },
        { id: 'paint-ext-upgrade', name: 'Exterior Paint Upgrade', description: 'Premium paint' },
        { id: 'black-windows', name: 'Upgrade: Black Windows & Doors', description: 'Exterior black finish' },
        { id: 'insulation-upgrade', name: 'Insulation Upgrade', description: 'Between floors, master, bathrooms' },
        { id: 'tile-upgrade', name: 'Bathroom Tile Upgrade', description: 'Premium tile' },
        { id: 'trim-upgrade', name: 'Interior Trim Upgrade', description: 'Premium trim package' },
        { id: 'hood-upgrade', name: 'Kitchen Hood Upgrade', description: 'Premium hood vent' },
      ]
    }
  ],
  defaultMarkups: {
    operatingExpense: 0.065,  // 6.5%
    profit: 0.20              // 20%
  }
};

const OakAngelApp = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([
    // Sample lead for demo
    {
      id: 1,
      name: 'John Richardson',
      phone: '843-555-0142',
      email: 'john.r@email.com',
      address: '1245 Harbor View Dr, Johns Island, SC 29455',
      projectType: 'Custom Build',
      status: 'New',
      source: 'Website',
      createdAt: '2025-01-28',
      communications: [
        { date: '2025-01-28', type: 'Phone', notes: 'Initial inquiry about custom home on 2-acre lot. Budget ~$850K. Wants to meet next week.' }
      ]
    }
  ]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showAddComm, setShowAddComm] = useState(false);

  // Estimate states
  const [estimates, setEstimates] = useState([]);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [showNewEstimate, setShowNewEstimate] = useState(false);
  const [estimateMode, setEstimateMode] = useState('quick'); // 'quick' or 'full'
  const [estimateItems, setEstimateItems] = useState({});
  const [estimateMarkups, setEstimateMarkups] = useState({
    operatingExpense: 0.065,
    profit: 0.20
  });

  // Form states
  const [newLead, setNewLead] = useState({
    name: '', phone: '', email: '', address: '',
    projectType: 'Custom Build', status: 'New', source: 'Website', notes: ''
  });
  const [newComm, setNewComm] = useState({ type: 'Phone', notes: '' });

  const projectTypes = [
    'Custom Build', 'Full Remodel', 'Kitchen Remodel', 'Bathroom Remodel',
    'Addition', 'Roofing', 'Siding', 'Restoration', 'Mother-In-Law Suite', 'Other'
  ];

  const statuses = ['New', 'Contacted', 'Meeting Scheduled', 'Estimate Sent', 'Negotiating', 'Won', 'Lost'];
  const sources = ['Website', 'Referral', 'Google', 'Facebook', 'Houzz', 'HomeAdvisor', 'Drive-by', 'Other'];
  const commTypes = ['Phone', 'Email', 'Text', 'In-Person', 'Video Call'];

  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone) return;
    const lead = {
      ...newLead,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      communications: newLead.notes ? [{
        date: new Date().toISOString().split('T')[0],
        type: 'Note',
        notes: newLead.notes
      }] : []
    };
    setLeads([lead, ...leads]);
    setNewLead({ name: '', phone: '', email: '', address: '', projectType: 'Custom Build', status: 'New', source: 'Website', notes: '' });
    setShowAddLead(false);
  };

  const handleAddCommunication = () => {
    if (!newComm.notes || !selectedLead) return;
    const updatedLeads = leads.map(lead => {
      if (lead.id === selectedLead.id) {
        return {
          ...lead,
          communications: [{
            date: new Date().toISOString().split('T')[0],
            type: newComm.type,
            notes: newComm.notes
          }, ...lead.communications]
        };
      }
      return lead;
    });
    setLeads(updatedLeads);
    setSelectedLead({ ...selectedLead, communications: [{ date: new Date().toISOString().split('T')[0], type: newComm.type, notes: newComm.notes }, ...selectedLead.communications] });
    setNewComm({ type: 'Phone', notes: '' });
    setShowAddComm(false);
  };

  const updateLeadStatus = (leadId, newStatus) => {
    const updatedLeads = leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    if (selectedLead?.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': '#2563eb',
      'Contacted': '#7c3aed',
      'Meeting Scheduled': '#0891b2',
      'Estimate Sent': '#ca8a04',
      'Negotiating': '#ea580c',
      'Won': '#16a34a',
      'Lost': '#64748b'
    };
    return colors[status] || '#64748b';
  };

  // Estimate Functions
  const createNewEstimate = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    
    const newEstimate = {
      id: Date.now(),
      leadId: leadId,
      leadName: lead.name,
      address: lead.address,
      projectType: lead.projectType,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Draft',
      items: {},
      markups: { ...ESTIMATE_TEMPLATE.defaultMarkups }
    };
    
    setEstimates([newEstimate, ...estimates]);
    setSelectedEstimate(newEstimate);
    setEstimateItems({});
    setEstimateMarkups({ ...ESTIMATE_TEMPLATE.defaultMarkups });
    setShowNewEstimate(false);
    setActiveTab('estimates');
  };

  const updateEstimateItem = (itemId, field, value) => {
    const numValue = parseFloat(value) || 0;
    setEstimateItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: numValue
      }
    }));
  };

  const calculateItemTotals = (item) => {
    const cost = (item?.unitCost || 0) * (item?.qty || 0);
    const opExpense = cost * estimateMarkups.operatingExpense;
    const subtotalWithOp = cost + opExpense;
    const profit = subtotalWithOp * estimateMarkups.profit;
    const customerPrice = subtotalWithOp + profit;
    return { cost, opExpense, profit, customerPrice };
  };

  const calculateEstimateTotals = () => {
    let totalCost = 0;
    let totalOpExpense = 0;
    let totalProfit = 0;
    let totalCustomerPrice = 0;

    Object.values(estimateItems).forEach(item => {
      const totals = calculateItemTotals(item);
      totalCost += totals.cost;
      totalOpExpense += totals.opExpense;
      totalProfit += totals.profit;
      totalCustomerPrice += totals.customerPrice;
    });

    return { totalCost, totalOpExpense, totalProfit, totalCustomerPrice };
  };

  const saveEstimate = () => {
    if (!selectedEstimate) return;
    const totals = calculateEstimateTotals();
    const updatedEstimate = {
      ...selectedEstimate,
      items: { ...estimateItems },
      markups: { ...estimateMarkups },
      totals: totals,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setEstimates(estimates.map(e => e.id === selectedEstimate.id ? updatedEstimate : e));
    setSelectedEstimate(updatedEstimate);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num || 0);
  };

  // Estimate UI Component
  const EstimatesPanel = () => {
    const totals = calculateEstimateTotals();
    
    return (
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Estimate List */}
        <div style={{
          width: '300px',
          backgroundColor: '#fff',
          borderRight: '1px solid #e5e2dc',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e5e2dc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Estimates</h2>
            <button
              onClick={() => setShowNewEstimate(true)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#c9a227',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              + New
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {estimates.length === 0 ? (
              <p style={{ padding: '20px', color: '#999', textAlign: 'center', fontSize: '14px' }}>
                No estimates yet. Create one from a lead.
              </p>
            ) : (
              estimates.map(est => (
                <div
                  key={est.id}
                  onClick={() => {
                    setSelectedEstimate(est);
                    setEstimateItems(est.items || {});
                    setEstimateMarkups(est.markups || ESTIMATE_TEMPLATE.defaultMarkups);
                  }}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid #f0ede8',
                    cursor: 'pointer',
                    backgroundColor: selectedEstimate?.id === est.id ? '#faf8f5' : '#fff',
                    borderLeft: selectedEstimate?.id === est.id ? '3px solid #c9a227' : '3px solid transparent'
                  }}
                >
                  <h3 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '600' }}>{est.leadName}</h3>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#666' }}>{est.projectType}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#999' }}>{est.createdAt}</span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: est.totals ? '#16a34a' : '#999'
                    }}>
                      {est.totals ? formatCurrency(est.totals.totalCustomerPrice) : 'Draft'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Estimate Detail */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8f6f3' }}>
          {selectedEstimate ? (
            <>
              {/* Estimate Header */}
              <div style={{
                padding: '16px 24px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e2dc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '600' }}>
                    {selectedEstimate.leadName}
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                    {selectedEstimate.address || selectedEstimate.projectType}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    display: 'flex',
                    backgroundColor: '#f0ede8',
                    borderRadius: '6px',
                    padding: '4px'
                  }}>
                    <button
                      onClick={() => setEstimateMode('quick')}
                      style={{
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        backgroundColor: estimateMode === 'quick' ? '#fff' : 'transparent',
                        color: estimateMode === 'quick' ? '#1a1a1a' : '#666',
                        boxShadow: estimateMode === 'quick' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      Quick Entry
                    </button>
                    <button
                      onClick={() => setEstimateMode('full')}
                      style={{
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        backgroundColor: estimateMode === 'full' ? '#fff' : 'transparent',
                        color: estimateMode === 'full' ? '#1a1a1a' : '#666',
                        boxShadow: estimateMode === 'full' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      Full Detail
                    </button>
                  </div>
                  <button
                    onClick={saveEstimate}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Totals Bar */}
              <div style={{
                padding: '12px 24px',
                backgroundColor: '#1a1a1a',
                display: 'flex',
                gap: '32px'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#a0a0a0', display: 'block' }}>Builder Cost</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{formatCurrency(totals.totalCost)}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#a0a0a0', display: 'block' }}>Operating (6.5%)</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{formatCurrency(totals.totalOpExpense)}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#a0a0a0', display: 'block' }}>Profit (20%)</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#16a34a' }}>{formatCurrency(totals.totalProfit)}</span>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span style={{ fontSize: '11px', color: '#c9a227', display: 'block' }}>Customer Price</span>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#c9a227' }}>{formatCurrency(totals.totalCustomerPrice)}</span>
                </div>
              </div>

              {/* Estimate Body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
                {estimateMode === 'quick' ? (
                  // Quick Entry Mode
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {ESTIMATE_TEMPLATE.categories.map(cat => (
                      <div key={cat.id} style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                      }}>
                        <div style={{
                          padding: '12px 16px',
                          backgroundColor: '#faf8f5',
                          borderBottom: '1px solid #f0ede8'
                        }}>
                          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                            {cat.name}
                          </h3>
                        </div>
                        <div style={{ padding: '8px' }}>
                          {cat.items.map(item => {
                            const itemData = estimateItems[item.id] || {};
                            const itemTotals = calculateItemTotals(itemData);
                            const hasValue = itemData.unitCost > 0 || itemData.qty > 0;
                            
                            return (
                              <div key={item.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 100px 80px 100px',
                                gap: '8px',
                                padding: '8px',
                                alignItems: 'center',
                                borderRadius: '6px',
                                backgroundColor: hasValue ? '#f0fdf4' : 'transparent'
                              }}>
                                <div>
                                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#1a1a1a' }}>{item.name}</span>
                                </div>
                                <input
                                  type="number"
                                  placeholder="Cost"
                                  value={itemData.unitCost || ''}
                                  onChange={(e) => updateEstimateItem(item.id, 'unitCost', e.target.value)}
                                  style={{
                                    padding: '6px 8px',
                                    border: '1px solid #e5e2dc',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    textAlign: 'right'
                                  }}
                                />
                                <input
                                  type="number"
                                  placeholder="Qty"
                                  value={itemData.qty || ''}
                                  onChange={(e) => updateEstimateItem(item.id, 'qty', e.target.value)}
                                  style={{
                                    padding: '6px 8px',
                                    border: '1px solid #e5e2dc',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    textAlign: 'right'
                                  }}
                                />
                                <span style={{
                                  fontSize: '13px',
                                  fontWeight: '600',
                                  color: itemTotals.customerPrice > 0 ? '#16a34a' : '#999',
                                  textAlign: 'right'
                                }}>
                                  {itemTotals.customerPrice > 0 ? formatCurrency(itemTotals.customerPrice) : '—'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Full Detail Mode
                  <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#faf8f5' }}>
                          <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e2dc' }}>Item</th>
                          <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e2dc', width: '200px' }}>Description</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: '600', borderBottom: '1px solid #e5e2dc', width: '90px' }}>Unit Cost</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: '600', borderBottom: '1px solid #e5e2dc', width: '60px' }}>Qty</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: '600', borderBottom: '1px solid #e5e2dc', width: '90px' }}>Builder Cost</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: '600', borderBottom: '1px solid #e5e2dc', width: '80px' }}>Op Exp</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: '600', borderBottom: '1px solid #e5e2dc', width: '80px' }}>Profit</th>
                          <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600', borderBottom: '1px solid #e5e2dc', width: '100px' }}>Customer $</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ESTIMATE_TEMPLATE.categories.map(cat => (
                          <React.Fragment key={cat.id}>
                            <tr style={{ backgroundColor: '#f8f6f3' }}>
                              <td colSpan="8" style={{ padding: '10px 12px', fontWeight: '700', color: '#1a1a1a' }}>
                                {cat.name}
                              </td>
                            </tr>
                            {cat.items.map(item => {
                              const itemData = estimateItems[item.id] || {};
                              const itemTotals = calculateItemTotals(itemData);
                              const hasValue = itemTotals.cost > 0;
                              
                              return (
                                <tr key={item.id} style={{ backgroundColor: hasValue ? '#f0fdf4' : '#fff' }}>
                                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0ede8' }}>{item.name}</td>
                                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0ede8', color: '#666', fontSize: '11px' }}>{item.description}</td>
                                  <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0ede8' }}>
                                    <input
                                      type="number"
                                      value={itemData.unitCost || ''}
                                      onChange={(e) => updateEstimateItem(item.id, 'unitCost', e.target.value)}
                                      style={{
                                        width: '100%',
                                        padding: '4px 6px',
                                        border: '1px solid #e5e2dc',
                                        borderRadius: '3px',
                                        fontSize: '12px',
                                        textAlign: 'right',
                                        boxSizing: 'border-box'
                                      }}
                                    />
                                  </td>
                                  <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0ede8' }}>
                                    <input
                                      type="number"
                                      value={itemData.qty || ''}
                                      onChange={(e) => updateEstimateItem(item.id, 'qty', e.target.value)}
                                      style={{
                                        width: '100%',
                                        padding: '4px 6px',
                                        border: '1px solid #e5e2dc',
                                        borderRadius: '3px',
                                        fontSize: '12px',
                                        textAlign: 'right',
                                        boxSizing: 'border-box'
                                      }}
                                    />
                                  </td>
                                  <td style={{ padding: '8px', borderBottom: '1px solid #f0ede8', textAlign: 'right', fontWeight: hasValue ? '500' : '400', color: hasValue ? '#1a1a1a' : '#ccc' }}>
                                    {hasValue ? formatCurrency(itemTotals.cost) : '—'}
                                  </td>
                                  <td style={{ padding: '8px', borderBottom: '1px solid #f0ede8', textAlign: 'right', color: hasValue ? '#666' : '#ccc' }}>
                                    {hasValue ? formatCurrency(itemTotals.opExpense) : '—'}
                                  </td>
                                  <td style={{ padding: '8px', borderBottom: '1px solid #f0ede8', textAlign: 'right', color: hasValue ? '#16a34a' : '#ccc' }}>
                                    {hasValue ? formatCurrency(itemTotals.profit) : '—'}
                                  </td>
                                  <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0ede8', textAlign: 'right', fontWeight: '600', color: hasValue ? '#1a1a1a' : '#ccc' }}>
                                    {hasValue ? formatCurrency(itemTotals.customerPrice) : '—'}
                                  </td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
              <p style={{ fontSize: '16px' }}>Select an estimate or create a new one</p>
            </div>
          )}
        </div>

        {/* New Estimate Modal */}
        {showNewEstimate && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '32px',
              width: '450px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h2 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '600' }}>
                Create Estimate
              </h2>
              <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#666' }}>
                Select a lead to create an estimate for:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {leads.map(lead => (
                  <button
                    key={lead.id}
                    onClick={() => createNewEstimate(lead.id)}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: '#faf8f5',
                      border: '1px solid #e5e2dc',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1a1a1a' }}>{lead.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{lead.projectType} • {lead.address?.split(',')[0] || 'No address'}</div>
                  </button>
                ))}
                {leads.length === 0 && (
                  <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
                    Add a lead first to create an estimate.
                  </p>
                )}
              </div>
              
              <button
                onClick={() => setShowNewEstimate(false)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e2dc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#666'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f6f3',
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src="https://oakangelbuilders.com/wp-content/uploads/2024/01/oak-angel-builders-logo-min-jpeg-jpg.webp" 
            alt="Oak Angel Builders" 
            style={{ height: '48px', objectFit: 'contain' }}
          />
          <div>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', margin: 0 }}>
              Construction Manager
            </h1>
            <p style={{ color: '#a0a0a0', fontSize: '12px', margin: 0 }}>Oak Angel Builders</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['leads', 'estimates', 'daily-logs', 'change-orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: activeTab === tab ? '#c9a227' : 'transparent',
                color: activeTab === tab ? '#1a1a1a' : '#a0a0a0',
                transition: 'all 0.2s'
              }}
            >
              {tab === 'leads' && '📋 Leads'}
              {tab === 'estimates' && '📊 Estimates'}
              {tab === 'daily-logs' && '📸 Daily Logs'}
              {tab === 'change-orders' && '📝 Change Orders'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      {activeTab === 'estimates' ? (
        <EstimatesPanel />
      ) : (
      <main style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Lead List Panel */}
        <div style={{
          width: '400px',
          backgroundColor: '#fff',
          borderRight: '1px solid #e5e2dc',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* List Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e5e2dc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
              Leads ({leads.length})
            </h2>
            <button
              onClick={() => setShowAddLead(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#c9a227',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              + Add Lead
            </button>
          </div>

          {/* Lead List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {leads.map(lead => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #f0ede8',
                  cursor: 'pointer',
                  backgroundColor: selectedLead?.id === lead.id ? '#faf8f5' : '#fff',
                  borderLeft: selectedLead?.id === lead.id ? '3px solid #c9a227' : '3px solid transparent',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>
                    {lead.name}
                  </h3>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(lead.status)}15`,
                    color: getStatusColor(lead.status)
                  }}>
                    {lead.status}
                  </span>
                </div>
                <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#666' }}>
                  {lead.projectType}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                  {lead.address?.split(',')[0] || 'No address'} • {lead.createdAt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {selectedLead ? (
            <div>
              {/* Lead Header */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>
                      {selectedLead.name}
                    </h2>
                    <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>
                      {selectedLead.projectType}
                    </p>
                  </div>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '2px solid #e5e2dc',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: getStatusColor(selectedLead.status),
                      backgroundColor: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid #f0ede8'
                }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Phone</label>
                    <a href={`tel:${selectedLead.phone}`} style={{ fontSize: '15px', color: '#2563eb', textDecoration: 'none' }}>
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Email</label>
                    <a href={`mailto:${selectedLead.email}`} style={{ fontSize: '15px', color: '#2563eb', textDecoration: 'none' }}>
                      {selectedLead.email || '—'}
                    </a>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Address</label>
                    <p style={{ margin: 0, fontSize: '15px', color: '#1a1a1a' }}>
                      {selectedLead.address || '—'}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Source</label>
                    <p style={{ margin: 0, fontSize: '15px', color: '#1a1a1a' }}>{selectedLead.source}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '4px' }}>Created</label>
                    <p style={{ margin: 0, fontSize: '15px', color: '#1a1a1a' }}>{selectedLead.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* Communication Log */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>
                    Communication Log
                  </h3>
                  <button
                    onClick={() => setShowAddComm(true)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}
                  >
                    + Add Entry
                  </button>
                </div>

                {selectedLead.communications.length === 0 ? (
                  <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
                    No communications logged yet
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedLead.communications.map((comm, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '16px',
                          backgroundColor: '#faf8f5',
                          borderRadius: '8px',
                          borderLeft: '3px solid #c9a227'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#666',
                            backgroundColor: '#e5e2dc',
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}>
                            {comm.type}
                          </span>
                          <span style={{ fontSize: '12px', color: '#999' }}>{comm.date}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#1a1a1a', lineHeight: '1.5' }}>
                          {comm.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#999'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
              <p style={{ fontSize: '16px' }}>Select a lead to view details</p>
            </div>
          )}
        </div>
      </main>
      )}

      {/* Add Lead Modal */}
      {showAddLead && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px',
            width: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>
              Add New Lead
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e5e2dc',
                    fontSize: '15px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="John Smith"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e5e2dc',
                      fontSize: '15px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="843-555-0100"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e5e2dc',
                      fontSize: '15px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                  Property Address
                </label>
                <input
                  type="text"
                  value={newLead.address}
                  onChange={(e) => setNewLead({ ...newLead, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e5e2dc',
                    fontSize: '15px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="123 Main St, Charleston, SC 29407"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                    Project Type
                  </label>
                  <select
                    value={newLead.projectType}
                    onChange={(e) => setNewLead({ ...newLead, projectType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e5e2dc',
                      fontSize: '15px',
                      backgroundColor: '#fff',
                      boxSizing: 'border-box'
                    }}
                  >
                    {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                    Lead Source
                  </label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e5e2dc',
                      fontSize: '15px',
                      backgroundColor: '#fff',
                      boxSizing: 'border-box'
                    }}
                  >
                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                  Initial Notes
                </label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e5e2dc',
                    fontSize: '15px',
                    minHeight: '100px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Details from first contact..."
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddLead(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '2px solid #e5e2dc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#666'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddLead}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#c9a227',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1a1a1a'
                }}
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Communication Modal */}
      {showAddComm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px',
            width: '450px'
          }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>
              Log Communication
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                  Type
                </label>
                <select
                  value={newComm.type}
                  onChange={(e) => setNewComm({ ...newComm, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e5e2dc',
                    fontSize: '15px',
                    backgroundColor: '#fff',
                    boxSizing: 'border-box'
                  }}
                >
                  {commTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
                  Notes
                </label>
                <textarea
                  value={newComm.notes}
                  onChange={(e) => setNewComm({ ...newComm, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e5e2dc',
                    fontSize: '15px',
                    minHeight: '120px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                  placeholder="What was discussed..."
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddComm(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '2px solid #e5e2dc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#666'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCommunication}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#c9a227',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1a1a1a'
                }}
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OakAngelApp;
