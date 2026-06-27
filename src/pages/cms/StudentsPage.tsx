import React, { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { Search, ShieldAlert, Mail, UserX, Loader2, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface Student {
  _id: string;
  name: string;
  email: string;
  username?: string;
  createdAt: string;
}

export default function StudentsPage() {
  const { secureFetch } = useFirebaseAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await secureFetch('/api/students');
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-['Cinzel'] flex items-center gap-3">
            Student Management
          </h1>
          <p className="text-zinc-400 mt-2">View and manage enrolled students, track progress, and handle access control.</p>
        </div>
        <div className="relative w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#FC642D] transition-colors text-sm"
          />
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-zinc-400">Student Name</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-zinc-400">Contact Details</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-zinc-400">Enrollment Date</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-zinc-400">Status</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FC642D] to-red-600 flex items-center justify-center font-bold text-white shadow-lg">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{student.name}</p>
                          <p className="text-xs text-zinc-500 font-mono mt-0.5">ID: {student._id.substring(student._id.length - 6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Mail size={14} className="text-zinc-500" />
                        {student.email}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-zinc-400 font-medium">
                      {new Date(student.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}
