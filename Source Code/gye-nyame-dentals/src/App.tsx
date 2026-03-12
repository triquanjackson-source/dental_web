import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Users, 
  ClipboardList, 
  Info, 
  Phone, 
  Menu, 
  X,
  CheckCircle2,
  Clock,
  UserCircle,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Patient, Appointment } from './types';

// Components
const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: ClipboardList },
    { id: 'book', label: 'Book Now', icon: Calendar },
    { id: 'staff', label: 'Staff Portal', icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">GN</div>
            <span className="text-xl font-serif font-bold text-slate-800 hidden sm:block">Gye Nyame Dentals</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link flex items-center gap-2 ${activeTab === item.id ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-slate-600'}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg ${activeTab === item.id ? 'bg-brand-secondary text-brand-primary' : 'text-slate-600'}`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomePage = ({ onBook }: { onBook: () => void }) => (
  <div className="space-y-20 pb-20">
    {/* Hero Section */}
    <section className="relative h-[600px] flex items-center overflow-hidden rounded-3xl mx-4 mt-4">
      <img 
        src="https://images.unsplash.com/photo-1629909606604-474c77658c70?auto=format&fit=crop&q=80&w=2000" 
        alt="Modern Dental Clinic" 
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-8 text-white space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold max-w-2xl leading-tight"
        >
          Your Smile, Our <span className="text-brand-primary italic">Commitment.</span>
        </motion.h1>
        <p className="text-lg text-slate-200 max-w-lg">
          Experience world-class dental care with a personal touch. From routine checkups to advanced cosmetic procedures, we're here for you.
        </p>
        <div className="flex gap-4">
          <button onClick={onBook} className="btn-primary text-lg px-8 py-3">Book Appointment</button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-all">Our Services</button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
      {[
        { title: 'Modern Equipment', desc: 'We use the latest technology for painless and precise treatments.', icon: Clock },
        { title: 'Expert Staff', desc: 'Our team consists of highly qualified and compassionate professionals.', icon: Users },
        { title: 'Emergency Care', desc: 'Available 24/7 for urgent dental needs that can\'t wait.', icon: Phone },
      ].map((f, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="card text-center space-y-4"
        >
          <div className="w-12 h-12 bg-brand-secondary text-brand-primary rounded-2xl flex items-center justify-center mx-auto">
            <f.icon size={24} />
          </div>
          <h3 className="text-xl font-bold">{f.title}</h3>
          <p className="text-slate-500">{f.desc}</p>
        </motion.div>
      ))}
    </section>

    {/* Video Section */}
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-slate-900 rounded-3xl overflow-hidden aspect-video relative group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000" 
          alt="Clinic Tour" 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
          <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Take a Virtual Tour</h2>
          <p className="text-slate-300">See our state-of-the-art facilities and meet our friendly team.</p>
        </div>
      </div>
    </section>
  </div>
);

const ServicesPage = () => {
  const services = [
    { name: 'General Dentistry', price: 'From $50', desc: 'Routine cleanings, fillings, and comprehensive exams.', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800' },
    { name: 'Cosmetic Procedures', price: 'From $200', desc: 'Teeth whitening, veneers, and smile makeovers.', img: 'https://images.unsplash.com/photo-1460676746856-e6561b29d466?auto=format&fit=crop&q=80&w=800' },
    { name: 'Orthodontics', price: 'From $1500', desc: 'Braces and clear aligners for all ages.', img: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800' },
    { name: 'Oral Surgery', price: 'From $300', desc: 'Wisdom teeth removal and dental implants.', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-slate-500">We provide a wide range of dental services to ensure your oral health is at its best. Quality care you can trust.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card overflow-hidden p-0 group"
          >
            <div className="h-48 overflow-hidden">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="p-6 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{s.name}</h3>
                <span className="text-brand-primary font-bold text-sm">{s.price}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    date: '',
    time: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // 1. Create/Get Patient
      const pRes = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob
        })
      });
      const { id: patient_id } = await pRes.json();

      // 2. Book Appointment
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id,
          date: formData.date,
          time: formData.time,
          notes: formData.notes
        })
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', dob: '', date: '', time: '', notes: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
        <p className="text-slate-500">Thank you for choosing Gye Nyame Dentals. We've sent a confirmation email with your appointment details.</p>
        <button onClick={() => setStatus('idle')} className="btn-primary">Book Another</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 md:p-12 bg-brand-primary text-white space-y-8">
          <h2 className="text-4xl font-bold">Book Your Visit</h2>
          <p className="text-teal-50 opacity-90">Fill out the form to schedule your appointment. Our team will contact you shortly to confirm the details.</p>
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Phone size={20} /></div>
              <span>+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Clock size={20} /></div>
              <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</label>
              <input 
                required
                type="tel" 
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Date of Birth</label>
              <input 
                required
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                value={formData.dob}
                onChange={e => setFormData({...formData, dob: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Appt Date</label>
              <input 
                required
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Preferred Time</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              >
                <option value="">Select a time slot</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
              </select>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

const StaffPortal = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [past, setPast] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'patients' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, uRes, paRes] = await Promise.all([
          fetch('/api/patients'),
          fetch('/api/appointments?type=upcoming'),
          fetch('/api/appointments?type=past')
        ]);
        setPatients(await pRes.json());
        setUpcoming(await uRes.json());
        setPast(await paRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center text-slate-500">Loading reports...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Staff Dashboard</h1>
          <p className="text-slate-500">Manage patients and track clinic appointments.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'History' },
            { id: 'patients', label: 'Patients' },
          ].map(v => (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeView === v.id ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              {activeView === 'patients' ? (
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Phone</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">DOB</th>
                </tr>
              ) : (
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Patient</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Time</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Notes</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Status</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activeView === 'patients' && patients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-slate-500">{p.email}</td>
                  <td className="px-6 py-4 text-slate-500">{p.phone}</td>
                  <td className="px-6 py-4 text-slate-500">{p.dob}</td>
                </tr>
              ))}
              {(activeView === 'upcoming' ? upcoming : activeView === 'past' ? past : []).map(a => (
                <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium">{a.patient_name}</div>
                    <div className="text-xs text-slate-400">{a.patient_email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{a.appointment_date}</td>
                  <td className="px-6 py-4 text-slate-500">{a.appointment_time}</td>
                  <td className="px-6 py-4 text-slate-500 italic text-sm">{a.notes || 'No notes'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${a.status === 'upcoming' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {((activeView === 'patients' && patients.length === 0) || 
            (activeView === 'upcoming' && upcoming.length === 0) || 
            (activeView === 'past' && past.length === 0)) && (
            <div className="p-12 text-center text-slate-400 italic">No records found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && <HomePage onBook={() => setActiveTab('book')} />}
            {activeTab === 'services' && <ServicesPage />}
            {activeTab === 'book' && <BookingPage />}
            {activeTab === 'staff' && <StaffPortal />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">GN</div>
              <span className="text-xl font-serif font-bold">Gye Nyame Dentals</span>
            </div>
            <p className="text-slate-400 text-sm">Providing exceptional dental care with compassion and excellence since 2010.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => setActiveTab('book')} className="hover:text-white transition-colors">Book Appointment</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} /> +1 (555) 000-0000</li>
              <li className="flex items-center gap-2"><Clock size={14} /> Mon-Sat: 8am - 6pm</li>
              <li className="flex items-center gap-2"><Info size={14} /> 123 Dental St, Smile City</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-primary w-full" />
              <button className="bg-brand-primary p-2 rounded-lg"><Plus size={20} /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
          &copy; 2024 Gye Nyame Dentals. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
