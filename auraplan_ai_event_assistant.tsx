import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, DollarSign, CheckSquare, Sparkles, Plus, Trash2, Edit3,
  Heart, Cake, Users, Clock, MapPin, ChevronRight, PieChart, CheckCircle2,
  Circle, AlertCircle, RefreshCw, Wand2, Download, Search, Filter,
  TrendingUp, Award, Phone, Mail, FileText, ArrowRight, ShieldCheck,
  Briefcase, MessageSquare, Compass, Layers, Check, X, HelpCircle
} from 'lucide-react';

// --- PRE-POPULATED TEMPLATES FOR INSTANT RICH EXPERIENCE ---
const EVENT_TEMPLATES = {
  wedding: {
    id: 'wedding',
    type: 'Wedding',
    name: 'Aarav & Priya’s Royal Garden Wedding',
    date: '2027-02-14',
    guests: 250,
    location: 'Taj Coromandel / ECR Beach Resort',
    totalBudget: 35000,
    theme: 'Ethereal Botanical Elegance with Gold Accents',
    colorPalette: ['#D4AF37', '#2E5A44', '#F9F6F0', '#E8C5B0'],
    budgetItems: [
      { id: 'b1', category: 'Venue & Rentals', item: 'Grand Lawn & Banquet Hall', estimated: 12000, actual: 11500, paid: true },
      { id: 'b2', category: 'Catering & Bar', item: 'Multi-Cuisine Gala Dinner & Mocktail Bar', estimated: 9500, actual: 9800, paid: true },
      { id: 'b3', category: 'Photography & Video', item: 'Cinematic Wedding Film & Candid Photo Team', estimated: 4000, actual: 4000, paid: false },
      { id: 'b4', category: 'Decor & Florals', item: 'Imported Orchids, Mandap & Fairy Canopies', estimated: 5500, actual: 5200, paid: false },
      { id: 'b5', category: 'Entertainment', item: 'Live Acoustic Fusion Band & DJ', estimated: 2500, actual: 2200, paid: false },
      { id: 'b6', category: 'Attire & Beauty', item: 'Bridal Couture & Groom Sherwani', estimated: 1500, actual: 1800, paid: true }
    ],
    timeline: [
      { id: 't1', phase: '6+ Months Out', title: 'Lock in Primary Venue & Date', dueDate: '2026-08-15', priority: 'High', status: 'completed', notes: 'Signed contract with resort, 50% deposit paid.' },
      { id: 't2', phase: '4-5 Months Out', title: 'Book Photographer & Cinematographer', dueDate: '2026-10-01', priority: 'High', status: 'completed', notes: 'Golden Hour Studios confirmed.' },
      { id: 't3', phase: '3 Months Out', title: 'Finalize Catering Menu & Tasting', dueDate: '2026-11-15', priority: 'High', status: 'in-progress', notes: 'Need to confirm vegan and Jain stations.' },
      { id: 't4', phase: '2 Months Out', title: 'Send Digital & Physical Invites', dueDate: '2026-12-10', priority: 'Medium', status: 'pending', notes: 'RSVP website link included.' },
      { id: 't5', phase: '1 Month Out', title: 'Final Seating Chart & Floor Plan', dueDate: '2027-01-15', priority: 'Medium', status: 'pending', notes: 'Coordinate with decor and venue manager.' },
      { id: 't6', phase: '1 Week Out', title: 'Rehearsal Dinner & Vendor Walkthrough', dueDate: '2027-02-07', priority: 'High', status: 'pending', notes: 'Confirm power backups and sound checks.' }
    ],
    vendors: [
      { id: 'v1', category: 'Venue', name: 'Banyan Tree Bay Resort', contact: 'Vikram Menon', phone: '+91 98401 23456', status: 'Booked', cost: 11500, rating: 5, notes: 'Includes bridal suite & valet parking.' },
      { id: 'v2', category: 'Catering', name: 'Spice Route Artisanal Kitchens', contact: 'Chef Ananya', phone: '+91 98402 87654', status: 'Booked', cost: 9800, rating: 5, notes: 'Live chaat and wood-fired pizza counters included.' },
      { id: 'v3', category: 'Photography', name: 'Lumina Stories Collective', contact: 'Rohan Dev', phone: '+91 98403 11223', status: 'Contract Sent', cost: 4000, rating: 4, notes: 'Drone coverage approved.' },
      { id: 'v4', category: 'Florist & Decor', name: 'Petal & Velvet Studio', contact: 'Meera Krishnan', phone: '+91 98404 99887', status: 'Shortlisted', cost: 5200, rating: 4, notes: 'Awaiting 3D stage render.' },
      { id: 'v5', category: 'Music & DJ', name: 'DJ Pulse & Symphony Quartet', contact: 'Karan', phone: '+91 98405 55443', status: 'Researching', cost: 2200, rating: 4, notes: 'Checking availability for Sangeet night.' }
    ],
    ideas: [
      { id: 'i1', category: 'Experience', title: 'Interactive Perfume Bar for Guests', description: 'Let guests blend their own mini botanical fragrance roll-on as a personalized wedding favor.', tags: ['Favors', 'Interactive', 'Luxury'] },
      { id: 'i2', category: 'Decor', title: 'Floating Candlelit Reflection Pool', description: 'Transform the central courtyard walkway with thousands of floating brass urulis and jasmine garlands.', tags: ['Lighting', 'Eco-Friendly', 'Romantic'] },
      { id: 'i3', category: 'Food & Drink', title: 'His & Hers Signature Botanical Mocktails', description: 'Smoked Rosemary Lychee Fizz & Hibiscus Rosewater Spritz served in custom monogrammed glassware.', tags: ['Drinks', 'Personalized'] }
    ],
    daySchedule: [
      { time: '02:00 PM', activity: 'Vendor Setup & Floral Installation', owner: 'Decor Team' },
      { time: '04:30 PM', activity: 'Guest Arrival & Welcome Refreshments', owner: 'Hospitality Crew' },
      { time: '05:15 PM', activity: 'Sunset Ceremony Under the Banyan Canopy', owner: 'Officiant & Family' },
      { time: '06:45 PM', activity: 'Golden Hour Couple Portraits & Cocktail Hour', owner: 'Photography Team' },
      { time: '08:00 PM', activity: 'Grand Reception Entry, Speeches & First Dance', owner: 'MC & DJ' },
      { time: '09:00 PM', activity: 'Gala Feast & Live Acoustic Set', owner: 'Catering Manager' }
    ]
  },
  birthday: {
    id: 'birthday',
    type: 'Birthday',
    name: 'Maya’s 30th Starlight Rooftop Soirée',
    date: '2026-11-28',
    guests: 80,
    location: 'Skyline Glasshouse Terrace',
    totalBudget: 6500,
    theme: 'Midnight Celestial Disco & Neon Lounge',
    colorPalette: ['#6366F1', '#EC4899', '#0F172A', '#FACC15'],
    budgetItems: [
      { id: 'b1', category: 'Venue & Rentals', item: 'Private Rooftop Deck & Lounge Pods', estimated: 2200, actual: 2100, paid: true },
      { id: 'b2', category: 'Catering & Bar', item: 'Tapas Grazing Tables & Craft Mixology', estimated: 2000, actual: 2150, paid: true },
      { id: 'b3', category: 'Cake & Desserts', item: '3-Tier Geode Mirror Glaze Cake & Macaron Tower', estimated: 550, actual: 520, paid: false },
      { id: 'b4', category: 'Decor & Lighting', item: 'Neon Custom Sign, Disco Balls & LED Uplighting', estimated: 950, actual: 900, paid: false },
      { id: 'b5', category: 'Entertainment', item: 'Vinyl House DJ & 360° Slow-Mo Photo Booth', estimated: 800, actual: 750, paid: false }
    ],
    timeline: [
      { id: 't1', phase: '2 Months Out', title: 'Reserve Rooftop Terrace', dueDate: '2026-09-28', priority: 'High', status: 'completed', notes: 'Rain backup indoor conservatory included.' },
      { id: 't2', phase: '1 Month Out', title: 'Order Custom Neon Sign & Cake Design', dueDate: '2026-10-25', priority: 'Medium', status: 'completed', notes: '"Thirty, Flirty & Thriving" neon ordered.' },
      { id: 't3', phase: '3 Weeks Out', title: 'Send Interactive Partiful / Digital Invites', dueDate: '2026-11-05', priority: 'High', status: 'in-progress', notes: '64 RSVPs confirmed so far.' },
      { id: 't4', phase: '1 Week Out', title: 'Curate Spotify Collaborative Playlist', dueDate: '2026-11-20', priority: 'Low', status: 'pending', notes: 'Ask guests for their favorite 2000s throwbacks.' }
    ],
    vendors: [
      { id: 'v1', category: 'Venue', name: 'CloudNine Conservatory', contact: 'Siddharth Rao', phone: '+91 98111 22334', status: 'Booked', cost: 2100, rating: 5, notes: 'Sound permit valid until 1:00 AM.' },
      { id: 'v2', category: 'Bakery', name: 'Sugar Alchemy Patisserie', contact: 'Chef Tara', phone: '+91 98222 33445', status: 'Booked', cost: 520, rating: 5, notes: 'Dark chocolate hazelnut & raspberry filling.' },
      { id: 'v3', category: 'Entertainment', name: 'SpinLab 360 Booths', contact: 'Arjun', phone: '+91 98333 44556', status: 'Shortlisted', cost: 750, rating: 4, notes: 'Instant AirDrop sharing.' }
    ],
    ideas: [
      { id: 'i1', category: 'Interactive', title: 'Time Capsule Polaroid Guestbook', description: 'Guests snap an Instax photo and write a prediction or wish for Maya’s next decade.', tags: ['Keepsake', 'Photo', 'Fun'] },
      { id: 'i2', category: 'Food & Drink', title: 'Glitter Cotton Candy Garnish Bar', description: 'Top sparkling mocktails and cocktails with edible shimmer clouds and star anise.', tags: ['Instagrammable', 'Drinks'] },
      { id: 'i3', category: 'Entertainment', title: 'Midnight Silent Disco Afterparty', description: 'Switch to 3-channel glowing LED headphones after midnight to keep the party pumping.', tags: ['Music', 'Late Night'] }
    ],
    daySchedule: [
      { time: '06:00 PM', activity: 'Neon & Disco Installation + Soundcheck', owner: 'Event Coordinator' },
      { time: '07:30 PM', activity: 'Doors Open & Welcome Starlight Spritz', owner: 'Bar Team' },
      { time: '08:30 PM', activity: 'Grazing Table Opens & 360 Photo Booth Live', owner: 'Catering' },
      { time: '10:00 PM', activity: 'Roast & Toast Speeches + Cake Cutting', owner: 'Best Friends' },
      { time: '10:30 PM', activity: 'Dance Floor Peak Set', owner: 'DJ' }
    ]
  },
  community: {
    id: 'community',
    type: 'Community',
    name: 'GreenFuture Neighborhood Eco & Arts Festival',
    date: '2026-12-12',
    guests: 600,
    location: 'Central Amphitheater & Civic Park',
    totalBudget: 15000,
    theme: 'Zero-Waste Sustainability, Local Makers & Live Folk Art',
    colorPalette: ['#10B981', '#F59E0B', '#065F46', '#FEF3C7'],
    budgetItems: [
      { id: 'b1', category: 'Permits & Venue', item: 'Municipal Park Permit, Insurance & Security', estimated: 2500, actual: 2400, paid: true },
      { id: 'b2', category: 'Staging & AV', item: 'Solar-Powered Acoustic Stage & PA System', estimated: 3800, actual: 3600, paid: true },
      { id: 'b3', category: 'Booths & Tents', item: '40 Bamboo Artisan Stalls & Workshop Canopy', estimated: 4200, actual: 4300, paid: false },
      { id: 'b4', category: 'Waste & Eco Ops', item: 'Compost Stations, Water Refill & Zero-Waste Crew', estimated: 1800, actual: 1750, paid: false },
      { id: 'b5', category: 'Marketing & Signage', item: 'Recycled Fabric Banners, PR & Volunteer Kits', estimated: 2700, actual: 2100, paid: true }
    ],
    timeline: [
      { id: 't1', phase: '3 Months Out', title: 'Secure City Park Permit & Civic Approvals', dueDate: '2026-09-15', priority: 'High', status: 'completed', notes: 'Approved by city commissioner.' },
      { id: 't2', phase: '2 Months Out', title: 'Close Local Artisan & Food Truck Applications', dueDate: '2026-10-15', priority: 'High', status: 'completed', notes: '42 local makers selected.' },
      { id: 't3', phase: '1 Month Out', title: 'Recruit & Train 50 Community Volunteers', dueDate: '2026-11-12', priority: 'High', status: 'in-progress', notes: '38 volunteers onboarded.' },
      { id: 't4', phase: '2 Weeks Out', title: 'Publish Festival Map & Workshop Schedule', dueDate: '2026-11-28', priority: 'Medium', status: 'pending', notes: 'QR code maps to reduce paper.' }
    ],
    vendors: [
      { id: 'v1', category: 'Staging & AV', name: 'SunWave Eco Sound Systems', contact: 'Prakash Nair', phone: '+91 98765 11122', status: 'Booked', cost: 3600, rating: 5, notes: '100% battery bank powered.' },
      { id: 'v2', category: 'Rentals', name: 'CraftCanopy Bamboo Structures', contact: 'Lakshmi S.', phone: '+91 98765 33344', status: 'Booked', cost: 4300, rating: 5, notes: 'Zero plastic zip-ties used.' },
      { id: 'v3', category: 'Sanitation', name: 'CleanEarth Zero-Waste Partners', contact: 'Deepak V.', phone: '+91 98765 55566', status: 'Contract Sent', cost: 1750, rating: 4, notes: 'Includes steel cup rental system.' }
    ],
    ideas: [
      { id: 'i1', category: 'Community Impact', title: 'Seed-Paper Festival Wristbands', description: 'Every attendee receives a biodegradable wristband embedded with native wildflower seeds they can plant at home.', tags: ['Zero-Waste', 'Interactive'] },
      { id: 'i2', category: 'Activity', title: 'Community Mural & Upcycling Repair Café', description: 'Visitors bring broken household items or clothes to fix alongside local craftsmen and contribute to a giant canvas mural.', tags: ['Workshops', 'Family-Friendly'] },
      { id: 'i3', category: 'Sponsorship', title: 'Sponsor-a-Tree Live Pledge Board', description: 'Local businesses pledge 1 sapling for every 10 attendees who bring their own reusable water bottle.', tags: ['Fundraising', 'Green'] }
    ],
    daySchedule: [
      { time: '08:00 AM', activity: 'Artisan Load-In & Bamboo Stall Inspection', owner: 'Site Ops Lead' },
      { time: '10:00 AM', activity: 'Festival Gates Open & Drum Circle Welcome', owner: 'Stage Manager' },
      { time: '11:30 AM', activity: 'Upcycling & Terrarium Workshops for Kids', owner: 'Education Tent' },
      { time: '01:00 PM', activity: 'Farm-to-Table Community Lunch & Panel Talk', owner: 'Main Stage' },
      { time: '04:00 PM', activity: 'Indie Folk Concert & Eco-Innovator Awards', owner: 'Festival Committee' },
      { time: '06:30 PM', activity: 'Zero-Waste Audit & Park Clean-Sweep', owner: 'Volunteer Squad' }
    ]
  }
};

// --- GEMINI API HELPER WITH EXPONENTIAL BACKOFF ---
const callGeminiAPI = async (prompt, schema = null) => {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [{
        text: "You are AuraPlan AI, a world-class luxury and community event architect, financial planner, and logistics director. Always provide practical, creative, culturally thoughtful, and budget-accurate recommendations."
      }]
    }
  };

  if (schema) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: schema
    };
  }

  let delay = 1000;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty response from Gemini");
      return schema ? JSON.parse(text) : text;
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
};

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeEventKey, setActiveEventKey] = useState('wedding');
  const [eventsData, setEventsData] = useState(EVENT_TEMPLATES);
  const [activeTab, setActiveTab] = useState('overview'); // overview, budget, timeline, vendors, ai-studio
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [toast, setToast] = useState(null);

  // Modals / Form states
  const [newBudgetItem, setNewBudgetItem] = useState({ category: 'Venue & Rentals', item: '', estimated: '', actual: '', paid: false });
  const [newTask, setNewTask] = useState({ phase: '1 Month Out', title: '', dueDate: '', priority: 'Medium', notes: '' });
  const [newVendor, setNewVendor] = useState({ category: 'Catering', name: '', contact: '', phone: '', status: 'Researching', cost: '', notes: '' });
  const [vendorFilter, setVendorFilter] = useState('All');
  const [timelineFilter, setTimelineFilter] = useState('All');

  // AI Studio States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiVibeStyle, setAiVibeStyle] = useState('Modern Luxe & Sustainable');
  const [aiDietaryFocus, setAiDietaryFocus] = useState('Inclusive Multi-Cuisine');
  const [aiSetting, setAiSetting] = useState('Indoor & Outdoor Hybrid');
  const [aiGeneratedBlueprint, setAiGeneratedBlueprint] = useState(null);
  const [aiQuickChat, setAiQuickChat] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm AuraPlan AI. Whether you need a complete event concept, a smart budget rebalance, vendor interview questions, or a minute-by-minute run-of-show, ask me below or use the One-Click AI Blueprint Generator!"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Active Event Shortcut
  const currentEvent = eventsData[activeEventKey];

  const showNotification = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const updateCurrentEvent = (updater) => {
    setEventsData(prev => ({
      ...prev,
      [activeEventKey]: typeof updater === 'function' ? updater(prev[activeEventKey]) : updater
    }));
  };

  // --- COMPUTED METRICS ---
  const metrics = useMemo(() => {
    const totalEstimated = currentEvent.budgetItems.reduce((acc, i) => acc + Number(i.estimated || 0), 0);
    const totalActual = currentEvent.budgetItems.reduce((acc, i) => acc + Number(i.actual || 0), 0);
    const totalPaid = currentEvent.budgetItems.filter(i => i.paid).reduce((acc, i) => acc + Number(i.actual || 0), 0);
    const remainingBudget = currentEvent.totalBudget - totalActual;
    const budgetPercent = currentEvent.totalBudget > 0 ? Math.min(100, Math.round((totalActual / currentEvent.totalBudget) * 100)) : 0;

    const totalTasks = currentEvent.timeline.length;
    const completedTasks = currentEvent.timeline.filter(t => t.status === 'completed').length;
    const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const bookedVendors = currentEvent.vendors.filter(v => v.status === 'Booked').length;
    const perGuestCost = currentEvent.guests > 0 ? Math.round(totalActual / currentEvent.guests) : 0;

    // Days countdown
    const today = new Date();
    const eventDate = new Date(currentEvent.date);
    const diffDays = Math.max(0, Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24)));

    return {
      totalEstimated,
      totalActual,
      totalPaid,
      remainingBudget,
      budgetPercent,
      totalTasks,
      completedTasks,
      taskProgress,
      bookedVendors,
      perGuestCost,
      diffDays
    };
  }, [currentEvent]);

  // --- BUDGET HANDLERS ---
  const handleAddBudgetItem = (e) => {
    e.preventDefault();
    if (!newBudgetItem.item.trim()) return;
    const itemObj = {
      id: 'b_' + Date.now(),
      category: newBudgetItem.category,
      item: newBudgetItem.item.trim(),
      estimated: Number(newBudgetItem.estimated) || 0,
      actual: Number(newBudgetItem.actual) || 0,
      paid: newBudgetItem.paid
    };
    updateCurrentEvent(ev => ({
      ...ev,
      budgetItems: [...ev.budgetItems, itemObj]
    }));
    setNewBudgetItem({ category: 'Venue & Rentals', item: '', estimated: '', actual: '', paid: false });
    showNotification('Added expense line item to budget!');
  };

  const handleToggleBudgetPaid = (id) => {
    updateCurrentEvent(ev => ({
      ...ev,
      budgetItems: ev.budgetItems.map(item => item.id === id ? { ...item, paid: !item.paid } : item)
    }));
  };

  const handleDeleteBudgetItem = (id) => {
    updateCurrentEvent(ev => ({
      ...ev,
      budgetItems: ev.budgetItems.filter(item => item.id !== id)
    }));
    showNotification('Removed budget item', 'info');
  };

  const handleUpdateActualCost = (id, val) => {
    updateCurrentEvent(ev => ({
      ...ev,
      budgetItems: ev.budgetItems.map(item => item.id === id ? { ...item, actual: Number(val) || 0 } : item)
    }));
  };

  // --- TIMELINE HANDLERS ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    const taskObj = {
      id: 't_' + Date.now(),
      phase: newTask.phase,
      title: newTask.title.trim(),
      dueDate: newTask.dueDate || currentEvent.date,
      priority: newTask.priority,
      status: 'pending',
      notes: newTask.notes.trim()
    };
    updateCurrentEvent(ev => ({
      ...ev,
      timeline: [...ev.timeline, taskObj]
    }));
    setNewTask({ phase: '1 Month Out', title: '', dueDate: '', priority: 'Medium', notes: '' });
    showNotification('Added milestone to timeline!');
  };

  const handleCycleTaskStatus = (id) => {
    const order = ['pending', 'in-progress', 'completed'];
    updateCurrentEvent(ev => ({
      ...ev,
      timeline: ev.timeline.map(t => {
        if (t.id !== id) return t;
        const nextStatus = order[(order.indexOf(t.status) + 1) % order.length];
        return { ...t, status: nextStatus };
      })
    }));
  };

  const handleDeleteTask = (id) => {
    updateCurrentEvent(ev => ({
      ...ev,
      timeline: ev.timeline.filter(t => t.id !== id)
    }));
  };

  // --- VENDOR HANDLERS ---
  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!newVendor.name.trim()) return;
    const vendorObj = {
      id: 'v_' + Date.now(),
      category: newVendor.category,
      name: newVendor.name.trim(),
      contact: newVendor.contact.trim() || 'Primary Coordinator',
      phone: newVendor.phone.trim() || 'TBD',
      status: newVendor.status,
      cost: Number(newVendor.cost) || 0,
      rating: 5,
      notes: newVendor.notes.trim()
    };
    updateCurrentEvent(ev => ({
      ...ev,
      vendors: [...ev.vendors, vendorObj]
    }));
    setNewVendor({ category: 'Catering', name: '', contact: '', phone: '', status: 'Researching', cost: '', notes: '' });
    showNotification('Added vendor to checklist!');
  };

  const handleUpdateVendorStatus = (id, status) => {
    updateCurrentEvent(ev => ({
      ...ev,
      vendors: ev.vendors.map(v => v.id === id ? { ...v, status } : v)
    }));
  };

  const handleDeleteVendor = (id) => {
    updateCurrentEvent(ev => ({
      ...ev,
      vendors: ev.vendors.filter(v => v.id !== id)
    }));
  };

  // --- GEN-AI FULL BLUEPRINT GENERATOR ---
  const handleGenerateAIBlueprint = async () => {
    setAiLoading(true);
    try {
      const schema = {
        type: "OBJECT",
        properties: {
          themeTitle: { type: "STRING" },
          conceptPitch: { type: "STRING" },
          colorPaletteHex: { type: "ARRAY", items: { type: "STRING" } },
          personalizedIdeas: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                category: { type: "STRING" },
                title: { type: "STRING" },
                description: { type: "STRING" },
                tags: { type: "ARRAY", items: { type: "STRING" } }
              },
              propertyOrdering: ["category", "title", "description", "tags"]
            }
          },
          recommendedBudgetBreakdown: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                category: { type: "STRING" },
                item: { type: "STRING" },
                estimated: { type: "NUMBER" }
              },
              propertyOrdering: ["category", "item", "estimated"]
            }
          },
          timelineMilestones: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                phase: { type: "STRING" },
                title: { type: "STRING" },
                priority: { type: "STRING" },
                notes: { type: "STRING" }
              },
              propertyOrdering: ["phase", "title", "priority", "notes"]
            }
          },
          vendorChecklistRecommendations: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                category: { type: "STRING" },
                suggestedRole: { type: "STRING" },
                estimatedCost: { type: "NUMBER" },
                keyQuestionToAsk: { type: "STRING" }
              },
              propertyOrdering: ["category", "suggestedRole", "estimatedCost", "keyQuestionToAsk"]
            }
          },
          dayOfSchedule: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                time: { type: "STRING" },
                activity: { type: "STRING" },
                owner: { type: "STRING" }
              },
              propertyOrdering: ["time", "activity", "owner"]
            }
          }
        },
        propertyOrdering: [
          "themeTitle", "conceptPitch", "colorPaletteHex",
          "personalizedIdeas", "recommendedBudgetBreakdown",
          "timelineMilestones", "vendorChecklistRecommendations", "dayOfSchedule"
        ]
      };

      const prompt = `Generate a comprehensive, creative, and realistic event planning package for a ${currentEvent.type} named "${currentEvent.name}".
Event Details:
- Date: ${currentEvent.date}
- Guest Count: ${currentEvent.guests}
- Location/Venue Type: ${currentEvent.location}
- Total Target Budget: ${currencySymbol}${currentEvent.totalBudget}
- Desired Vibe/Aesthetic: ${aiVibeStyle}
- Food & Beverage Focus: ${aiDietaryFocus}
- Setting: ${aiSetting}
- Special User Request: ${aiPromptInput || 'Make it unforgettable, guest-centric, and well-paced within the total budget.'}

Ensure the sum of recommendedBudgetBreakdown estimated costs roughly matches ${currentEvent.totalBudget}. Provide 4 hex color codes in colorPaletteHex, 4 personalizedIdeas, 5 recommendedBudgetBreakdown items, 5 timelineMilestones, 4 vendorChecklistRecommendations, and 5 dayOfSchedule items.`;

      const result = await callGeminiAPI(prompt, schema);
      setAiGeneratedBlueprint(result);
      showNotification('AI Event Blueprint generated! Review and merge items below.');
    } catch (error) {
      showNotification('Could not reach Gemini AI right now. Please try again.', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  // --- APPLY AI BLUEPRINT ITEMS TO CURRENT EVENT ---
  const handleApplyEntireBlueprint = () => {
    if (!aiGeneratedBlueprint) return;
    updateCurrentEvent(ev => ({
      ...ev,
      theme: aiGeneratedBlueprint.themeTitle || ev.theme,
      colorPalette: aiGeneratedBlueprint.colorPaletteHex?.length === 4 ? aiGeneratedBlueprint.colorPaletteHex : ev.colorPalette,
      ideas: [
        ...(aiGeneratedBlueprint.personalizedIdeas || []).map((idea, idx) => ({
          id: 'ai_idea_' + Date.now() + '_' + idx,
          ...idea
        })),
        ...ev.ideas
      ],
      budgetItems: (aiGeneratedBlueprint.recommendedBudgetBreakdown || []).map((b, idx) => ({
        id: 'ai_b_' + Date.now() + '_' + idx,
        category: b.category,
        item: b.item,
        estimated: Number(b.estimated) || 0,
        actual: Number(b.estimated) || 0,
        paid: false
      })),
      timeline: [
        ...ev.timeline,
        ...(aiGeneratedBlueprint.timelineMilestones || []).map((m, idx) => ({
          id: 'ai_t_' + Date.now() + '_' + idx,
          phase: m.phase,
          title: m.title,
          dueDate: ev.date,
          priority: ['High', 'Medium', 'Low'].includes(m.priority) ? m.priority : 'Medium',
          status: 'pending',
          notes: m.notes
        }))
      ],
      vendors: [
        ...ev.vendors,
        ...(aiGeneratedBlueprint.vendorChecklistRecommendations || []).map((v, idx) => ({
          id: 'ai_v_' + Date.now() + '_' + idx,
          category: v.category,
          name: v.suggestedRole,
          contact: 'AI Suggested Specialist',
          phone: 'TBD',
          status: 'Researching',
          cost: Number(v.estimatedCost) || 0,
          rating: 5,
          notes: `Ask: "${v.keyQuestionToAsk}"`
        }))
      ],
      daySchedule: aiGeneratedBlueprint.dayOfSchedule || ev.daySchedule
    }));
    showNotification('Merged AI Blueprint into your Budget, Timeline, Vendors & Ideas!');
  };

  // --- AI CONVERSATIONAL CO-PILOT ---
  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setAiQuickChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const prompt = `Event Context:
- Event Type: ${currentEvent.type} ("${currentEvent.name}")
- Guests: ${currentEvent.guests}
- Budget: ${currencySymbol}${currentEvent.totalBudget} (Currently allocated: ${currencySymbol}${metrics.totalActual})
- Theme: ${currentEvent.theme}
- Location: ${currentEvent.location}

User Question: "${userMsg}"

Respond concisely with actionable, structured bullet points tailored specifically to this ${currentEvent.type}.`;

      const reply = await callGeminiAPI(prompt);
      setAiQuickChat(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setAiQuickChat(prev => [
        ...prev,
        { role: 'assistant', text: "I encountered a temporary connection hiccup. Please try asking again in a moment!" }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // --- EXPORT SUMMARY ---
  const handleCopySummary = () => {
    const summaryText = `
=== ${currentEvent.name.toUpperCase()} (${currentEvent.type}) ===
Date: ${currentEvent.date} | Guests: ${currentEvent.guests} | Venue: ${currentEvent.location}
Theme: ${currentEvent.theme}
Total Budget: ${currencySymbol}${currentEvent.totalBudget.toLocaleString()} | Committed: ${currencySymbol}${metrics.totalActual.toLocaleString()}

-- KEY BUDGET ITEMS --
${currentEvent.budgetItems.map(b => `• [${b.category}] ${b.item}: Est ${currencySymbol}${b.estimated} / Actual ${currencySymbol}${b.actual} (${b.paid ? 'PAID' : 'UNPAID'})`).join('\n')}

-- UPCOMING MILESTONES --
${currentEvent.timeline.map(t => `• [${t.status.toUpperCase()}] ${t.phase} - ${t.title} (Due: ${t.dueDate})`).join('\n')}

-- VENDOR CHECKLIST --
${currentEvent.vendors.map(v => `• ${v.category}: ${v.name} (${v.status}) - ${currencySymbol}${v.cost}`).join('\n')}
    `.trim();

    const textArea = document.createElement("textarea");
    textArea.value = summaryText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Full event plan copied to clipboard!');
  };

  const eventTypeBadge = (type) => {
    switch (type) {
      case 'Wedding':
        return { icon: Heart, bg: 'bg-rose-500/10 text-rose-600 border-rose-200', accent: 'from-rose-500 to-amber-500' };
      case 'Birthday':
        return { icon: Cake, bg: 'bg-indigo-500/10 text-indigo-600 border-indigo-200', accent: 'from-indigo-500 to-pink-500' };
      default:
        return { icon: Users, bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', accent: 'from-emerald-500 to-teal-500' };
    }
  };

  const activeBadge = eventTypeBadge(currentEvent.type);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl bg-slate-900 text-white border border-slate-700 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${activeBadge.accent} flex items-center justify-center text-white shadow-md`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">AuraPlan AI</h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Gemini 3 Flash
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Intelligent Wedding, Birthday & Community Event Studio
              </p>
            </div>
          </div>

          {/* Event Type Switcher Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[
              { key: 'wedding', label: 'Wedding', icon: Heart },
              { key: 'birthday', label: 'Birthday', icon: Cake },
              { key: 'community', label: 'Community', icon: Users }
            ].map(item => {
              const IconComp = item.icon;
              const isSelected = activeEventKey === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveEventKey(item.key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-rose-500' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Currency & Export Actions */}
          <div className="flex items-center gap-2.5">
            <select
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
              aria-label="Currency selector"
            >
              <option value="$">USD ($)</option>
              <option value="₹">INR (₹)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
            </select>
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Plan</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO EVENT BANNER & QUICK EDITABLE METADATA */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${activeBadge.bg}`}>
                  <activeBadge.icon className="w-3.5 h-3.5" />
                  {currentEvent.type} Blueprint
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {metrics.diffDays} days away
                </span>
                <div className="flex items-center gap-1 ml-1" title="Theme Color Palette">
                  {currentEvent.colorPalette.map((hex, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-sm"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={currentEvent.name}
                onChange={(e) => updateCurrentEvent(ev => ({ ...ev, name: e.target.value }))}
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none w-full transition"
              />

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 pt-1">
                <label className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={currentEvent.date}
                    onChange={(e) => updateCurrentEvent(ev => ({ ...ev, date: e.target.value }))}
                    className="bg-slate-100 px-2 py-1 rounded-md font-medium text-slate-800 focus:outline-none"
                  />
                </label>
                <label className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    value={currentEvent.guests}
                    onChange={(e) => updateCurrentEvent(ev => ({ ...ev, guests: Number(e.target.value) || 1 }))}
                    className="w-20 bg-slate-100 px-2 py-1 rounded-md font-medium text-slate-800 focus:outline-none"
                  />
                  <span>Guests</span>
                </label>
                <label className="flex items-center gap-1.5 flex-1 min-w-[200px]">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={currentEvent.location}
                    onChange={(e) => updateCurrentEvent(ev => ({ ...ev, location: e.target.value }))}
                    className="bg-slate-100 px-2.5 py-1 rounded-md font-medium text-slate-800 w-full max-w-xs focus:outline-none"
                  />
                </label>
              </div>
            </div>

            {/* 4 Key KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:w-auto">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 min-w-[135px]">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Budget Used</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {currencySymbol}{metrics.totalActual.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">
                  of {currencySymbol}{currentEvent.totalBudget.toLocaleString()} ({metrics.budgetPercent}%)
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 min-w-[135px]">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Cost / Guest</span>
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {currencySymbol}{metrics.perGuestCost.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">
                  {currentEvent.guests} confirmed cap
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 min-w-[135px]">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Milestones</span>
                  <CheckSquare className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {metrics.completedTasks}/{metrics.totalTasks}
                </p>
                <p className="text-[11px] text-slate-500">
                  {metrics.taskProgress}% completed
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 min-w-[135px]">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Vendors Locked</span>
                  <Briefcase className="w-4 h-4 text-rose-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {metrics.bookedVendors}/{currentEvent.vendors.length}
                </p>
                <p className="text-[11px] text-slate-500">
                  Active contracts
                </p>
              </div>
            </div>
          </div>

          {/* MODULE NAVIGATION TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-100 no-scrollbar">
            {[
              { id: 'overview', label: 'Overview & Schedule', icon: Compass },
              { id: 'budget', label: 'Budget Tracker', icon: DollarSign },
              { id: 'timeline', label: 'Timeline Milestones', icon: Calendar },
              { id: 'vendors', label: 'Vendor Checklist', icon: Briefcase },
              { id: 'ai-studio', label: 'AI Concept & Planner Studio', icon: Sparkles, highlight: true }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? tab.highlight
                        ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow-md'
                        : 'bg-slate-900 text-white shadow-sm'
                      : tab.highlight
                      ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN WORKSPACE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ==================== TAB 1: OVERVIEW & SCHEDULE ==================== */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Personalized Ideas & Run-of-Show Schedule */}
            <div className="lg:col-span-2 space-y-6">
              {/* Theme & Vision Banner */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Curated Aesthetic & Concept
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                      {currentEvent.theme}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('ai-studio')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                  >
                    <Wand2 className="w-4 h-4" />
                    Generate New Concepts with AI
                  </button>
                </div>

                {/* Personalized Ideas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {currentEvent.ideas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-indigo-300 transition"
                    >
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                          {idea.category}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm mt-2.5">
                          {idea.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {idea.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-200/60">
                        {(idea.tags || []).map((tag, i) => (
                          <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Day Run-of-Show Schedule */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Event-Day Run of Show</h3>
                    <p className="text-xs text-slate-500">Hour-by-hour operational flow for vendors and hosts</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {currentEvent.daySchedule.length} Slots
                  </span>
                </div>

                <div className="space-y-3">
                  {currentEvent.daySchedule.map((slot, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white shrink-0">
                          {slot.time}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">
                          {slot.activity}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 self-start sm:self-center">
                        Lead: {slot.owner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Quick Health Snapshot & Priority Action Items */}
            <div className="space-y-6">
              {/* Budget Health Bar */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">Financial Snapshot</h3>
                  <button
                    onClick={() => setActiveTab('budget')}
                    className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    Manage <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden my-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      metrics.remainingBudget < 0 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${metrics.budgetPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-slate-50">
                    <span className="text-slate-500 block">Settled / Paid</span>
                    <span className="text-base font-bold text-emerald-600">
                      {currencySymbol}{metrics.totalPaid.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50">
                    <span className="text-slate-500 block">Remaining Buffer</span>
                    <span className={`text-base font-bold ${metrics.remainingBudget < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                      {currencySymbol}{metrics.remainingBudget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Priority Tasks */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900">Up Next on Timeline</h3>
                  <button
                    onClick={() => setActiveTab('timeline')}
                    className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    All Tasks <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {currentEvent.timeline.filter(t => t.status !== 'completed').slice(0, 4).map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleCycleTaskStatus(task.id)}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 cursor-pointer hover:border-slate-300 transition"
                    >
                      <button className="mt-0.5 text-slate-400 hover:text-emerald-600">
                        {task.status === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-slate-500">{task.phase}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                            task.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: INTERACTIVE BUDGET TRACKER ==================== */}
        {activeTab === 'budget' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Expense Table & Category Breakdown */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Interactive Budget Ledger</h2>
                  <p className="text-xs text-slate-500">Compare estimated allocations against actual vendor quotes</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Target Cap ({currencySymbol}):</span>
                  <input
                    type="number"
                    value={currentEvent.totalBudget}
                    onChange={(e) => updateCurrentEvent(ev => ({ ...ev, totalBudget: Number(e.target.value) || 0 }))}
                    className="w-28 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-bold text-sm text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                      <th className="py-3 px-2">Category & Line Item</th>
                      <th className="py-3 px-2">Estimated</th>
                      <th className="py-3 px-2">Actual Cost</th>
                      <th className="py-3 px-2">Variance</th>
                      <th className="py-3 px-2 text-center">Paid</th>
                      <th className="py-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {currentEvent.budgetItems.map((item) => {
                      const diff = item.estimated - item.actual;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-2">
                            <span className="text-[11px] font-semibold text-indigo-600 block">{item.category}</span>
                            <span className="font-semibold text-slate-800">{item.item}</span>
                          </td>
                          <td className="py-3.5 px-2 text-slate-600 font-medium">
                            {currencySymbol}{item.estimated.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-2">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400 text-xs">{currencySymbol}</span>
                              <input
                                type="number"
                                value={item.actual}
                                onChange={(e) => handleUpdateActualCost(item.id, e.target.value)}
                                className="w-24 px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 font-semibold text-slate-900 text-xs focus:outline-none"
                              />
                            </div>
                          </td>
                          <td className="py-3.5 px-2 text-xs font-bold">
                            {diff >= 0 ? (
                              <span className="text-emerald-600">+{currencySymbol}{diff.toLocaleString()}</span>
                            ) : (
                              <span className="text-rose-600">-{currencySymbol}{Math.abs(diff).toLocaleString()}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-2 text-center">
                            <button
                              onClick={() => handleToggleBudgetPaid(item.id)}
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                                item.paid
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {item.paid ? 'Paid' : 'Unpaid'}
                            </button>
                          </td>
                          <td className="py-3.5 px-2 text-right">
                            <button
                              onClick={() => handleDeleteBudgetItem(item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                              title="Remove line item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Add Expense Form */}
            <div className="space-y-6">
              <form onSubmit={handleAddBudgetItem} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  Add Budget Line Item
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                  <select
                    value={newBudgetItem.category}
                    onChange={(e) => setNewBudgetItem({ ...newBudgetItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none"
                  >
                    <option>Venue & Rentals</option>
                    <option>Catering & Bar</option>
                    <option>Decor & Florals</option>
                    <option>Photography & Video</option>
                    <option>Entertainment & AV</option>
                    <option>Attire & Gifts</option>
                    <option>Permits & Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Expense Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Acoustic Trio / Floral Arch"
                    value={newBudgetItem.item}
                    onChange={(e) => setNewBudgetItem({ ...newBudgetItem, item: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Estimated ({currencySymbol})</label>
                    <input
                      type="number"
                      placeholder="1500"
                      value={newBudgetItem.estimated}
                      onChange={(e) => setNewBudgetItem({ ...newBudgetItem, estimated: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Actual ({currencySymbol})</label>
                    <input
                      type="number"
                      placeholder="1450"
                      value={newBudgetItem.actual}
                      onChange={(e) => setNewBudgetItem({ ...newBudgetItem, actual: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition"
                >
                  Add to Budget
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: TIMELINE MILESTONES ==================== */}
        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Planning Timeline & Milestones</h2>
                  <p className="text-xs text-slate-500">Click any task status icon to cycle Pending → In Progress → Completed</p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {['All', 'pending', 'in-progress', 'completed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setTimelineFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                        timelineFilter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {currentEvent.timeline
                  .filter(t => timelineFilter === 'All' || t.status === timelineFilter)
                  .map(task => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        task.status === 'completed'
                          ? 'bg-emerald-50/40 border-emerald-200/80'
                          : task.status === 'in-progress'
                          ? 'bg-amber-50/40 border-amber-200/80'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <button
                          onClick={() => handleCycleTaskStatus(task.id)}
                          className="mt-0.5 shrink-0"
                          title="Click to cycle status"
                        >
                          {task.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : task.status === 'in-progress' ? (
                            <Clock className="w-5 h-5 text-amber-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-600" />
                          )}
                        </button>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                              {task.phase}
                            </span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              task.priority === 'High'
                                ? 'bg-rose-100 text-rose-700'
                                : task.priority === 'Medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {task.priority} Priority
                            </span>
                            <span className="text-xs text-slate-500">Due: {task.dueDate}</span>
                          </div>
                          <h4 className={`font-bold text-sm mt-1.5 ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {task.title}
                          </h4>
                          {task.notes && (
                            <p className="text-xs text-slate-600 mt-1">{task.notes}</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="self-end sm:self-center p-1.5 text-slate-400 hover:text-rose-600"
                        title="Delete milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Add Milestone Form */}
            <div>
              <form onSubmit={handleAddTask} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  Add Timeline Milestone
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Countdown Phase</label>
                  <select
                    value={newTask.phase}
                    onChange={(e) => setNewTask({ ...newTask, phase: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  >
                    <option>6+ Months Out</option>
                    <option>3-5 Months Out</option>
                    <option>2 Months Out</option>
                    <option>1 Month Out</option>
                    <option>2 Weeks Out</option>
                    <option>1 Week Out</option>
                    <option>Event Day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Milestone Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Confirm Audio-Visual Tech Rider"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Notes / Deliverables</label>
                  <textarea
                    rows="2"
                    placeholder="Key details or reminders..."
                    value={newTask.notes}
                    onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition"
                >
                  Add Milestone
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: VENDOR CHECKLIST ==================== */}
        {activeTab === 'vendors' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Vendor Pipeline & Checklist</h2>
                    <p className="text-xs text-slate-500">Track quotes, contracts, and contact details across every category</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    {['All', 'Researching', 'Shortlisted', 'Contract Sent', 'Booked'].map(st => (
                      <button
                        key={st}
                        onClick={() => setVendorFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          vendorFilter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentEvent.vendors
                    .filter(v => vendorFilter === 'All' || v.status === vendorFilter)
                    .map(vendor => (
                      <div
                        key={vendor.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between gap-3 hover:border-slate-300 transition"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                              {vendor.category}
                            </span>
                            <select
                              value={vendor.status}
                              onChange={(e) => handleUpdateVendorStatus(vendor.id, e.target.value)}
                              className={`text-xs font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                                vendor.status === 'Booked'
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                  : vendor.status === 'Contract Sent'
                                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                                  : 'bg-white text-slate-700 border-slate-200'
                              }`}
                            >
                              <option>Researching</option>
                              <option>Shortlisted</option>
                              <option>Contract Sent</option>
                              <option>Booked</option>
                            </select>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 mt-2.5">{vendor.name}</h3>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Contact: <strong className="text-slate-800">{vendor.contact}</strong> • {vendor.phone}
                          </p>
                          {vendor.notes && (
                            <p className="text-xs text-slate-500 mt-2 bg-white p-2.5 rounded-xl border border-slate-200/60">
                              {vendor.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                          <span className="text-sm font-extrabold text-slate-900">
                            Quote: {currencySymbol}{Number(vendor.cost).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleDeleteVendor(vendor.id)}
                            className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Add Vendor Form */}
            <div>
              <form onSubmit={handleAddVendor} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  Add Vendor to Checklist
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Service Category</label>
                  <select
                    value={newVendor.category}
                    onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  >
                    <option>Venue</option>
                    <option>Catering</option>
                    <option>Photography & Film</option>
                    <option>Florist & Decor</option>
                    <option>Music, DJ & AV</option>
                    <option>Bakery & Desserts</option>
                    <option>Rentals & Staging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Business / Vendor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Velvet Rose Florals"
                    value={newVendor.name}
                    onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newVendor.contact}
                      onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Estimated Quote ({currencySymbol})</label>
                    <input
                      type="number"
                      placeholder="2500"
                      value={newVendor.cost}
                      onChange={(e) => setNewVendor({ ...newVendor, cost: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Contract & Deliverables Notes</label>
                  <textarea
                    rows="2"
                    placeholder="Deposit terms, inclusions, questions..."
                    value={newVendor.notes}
                    onChange={(e) => setNewVendor({ ...newVendor, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition"
                >
                  Save Vendor
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: GEN-AI CONCEPT & PLANNER STUDIO ==================== */}
        {activeTab === 'ai-studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Structured AI Event Blueprint Generator */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-600 flex items-center justify-center text-white">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">AI Event Architect & Blueprint Generator</h2>
                    <p className="text-xs text-slate-500">
                      Generate a tailored concept, budget split, timeline, vendor list, and schedule for your {currentEvent.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Aesthetic & Vibe</label>
                    <select
                      value={aiVibeStyle}
                      onChange={(e) => setAiVibeStyle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                    >
                      <option>Modern Luxe & Sustainable</option>
                      <option>Royal Heritage & Traditional</option>
                      <option>Bohemian Garden & Acoustic</option>
                      <option>Futuristic Neon & High-Energy</option>
                      <option>Minimalist Intimate & Cozy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Culinary Style</label>
                    <select
                      value={aiDietaryFocus}
                      onChange={(e) => setAiDietaryFocus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                    >
                      <option>Inclusive Multi-Cuisine</option>
                      <option>Artisanal Grazing & Tapas</option>
                      <option>100% Plant-Based / Farm-to-Table</option>
                      <option>Interactive Live Food Stations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Venue Setting</label>
                    <select
                      value={aiSetting}
                      onChange={(e) => setAiSetting(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                    >
                      <option>Indoor & Outdoor Hybrid</option>
                      <option>Open-Air Under the Stars</option>
                      <option>Grand Ballroom / Conservatory</option>
                      <option>Beachfront / Waterfront</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Custom Details or Special Wishes (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={aiPromptInput}
                    onChange={(e) => setAiPromptInput(e.target.value)}
                    placeholder={`e.g., Include kid-friendly activities, a surprise performance, or keep decor zero-waste within ${currencySymbol}${currentEvent.totalBudget}...`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={handleGenerateAIBlueprint}
                  disabled={aiLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-bold text-sm shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {aiLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Designing Custom {currentEvent.type} Blueprint with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Complete AI Event Blueprint ({currencySymbol}{currentEvent.totalBudget.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>

              {/* DISPLAY GENERATED AI BLUEPRINT */}
              {aiGeneratedBlueprint && (
                <div className="bg-white rounded-2xl p-6 border-2 border-indigo-500/30 shadow-md space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                        AI Generated Concept Ready
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {aiGeneratedBlueprint.themeTitle}
                      </h3>
                    </div>
                    <button
                      onClick={handleApplyEntireBlueprint}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Check className="w-4 h-4" />
                      Apply Blueprint to My Plan
                    </button>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {aiGeneratedBlueprint.conceptPitch}
                  </p>

                  {/* Color Palette Preview */}
                  {aiGeneratedBlueprint.colorPaletteHex && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Suggested Palette:</span>
                      {aiGeneratedBlueprint.colorPaletteHex.map((hex, i) => (
                        <div key={i} className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg text-xs">
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: hex }} />
                          <span className="font-mono text-[11px]">{hex}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Generated Ideas */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Personalized Signature Ideas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(aiGeneratedBlueprint.personalizedIdeas || []).map((idea, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                          <span className="text-[10px] font-bold text-indigo-600 uppercase">{idea.category}</span>
                          <p className="font-bold text-xs text-slate-900 mt-0.5">{idea.title}</p>
                          <p className="text-xs text-slate-600 mt-1">{idea.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated Budget & Vendor Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <h5 className="text-xs font-bold text-slate-800 mb-2">AI Budget Allocation</h5>
                      <ul className="space-y-1.5 text-xs">
                        {(aiGeneratedBlueprint.recommendedBudgetBreakdown || []).map((b, i) => (
                          <li key={i} className="flex justify-between text-slate-600">
                            <span>{b.item}</span>
                            <strong className="text-slate-900">{currencySymbol}{Number(b.estimated).toLocaleString()}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <h5 className="text-xs font-bold text-slate-800 mb-2">Key Vendor Questions</h5>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {(aiGeneratedBlueprint.vendorChecklistRecommendations || []).map((v, i) => (
                          <li key={i}>
                            <strong className="text-slate-800">{v.category}:</strong> “{v.keyQuestionToAsk}”
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Conversational AI Event Co-Pilot */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[560px]">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Ask AuraPlan Co-Pilot</h3>
                      <p className="text-[11px] text-slate-500">Instant advice on etiquette, speeches, menus & negotiations</p>
                    </div>
                  </div>
                </div>

                {/* Quick Prompt Chips */}
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {[
                    'How can I trim 15% off my budget?',
                    'Write a warm welcome toast speech',
                    'Rain backup plan checklist',
                    'Creative zero-waste party favors'
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setChatInput(q)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 whitespace-nowrap transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {aiQuickChat.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-800 border border-slate-200/70'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-600 rounded-2xl px-4 py-2.5 text-xs flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                        AuraPlan AI is thinking...
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Ask anything about ${currentEvent.name}...`}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    Ask AI
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}