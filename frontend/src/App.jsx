import { useState } from 'react';

export default function App() {
  const [zaloId, setZaloId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [patients, setPatients] = useState([]);

  const addPatient = async () => {
    const res = await fetch('/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zalo_id: zaloId, name, phone, dob })
    });
    if (res.ok) {
      const data = await res.json();
      setPatients(p => [...p, data]);
      setZaloId('');
      setName('');
      setPhone('');
      setDob('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Patients</h1>
      <input placeholder="zalo_id" value={zaloId} onChange={e => setZaloId(e.target.value)} />
      <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="dob" value={dob} onChange={e => setDob(e.target.value)} />
      <button onClick={addPatient}>Add</button>
      <ul>
        {patients.map(p => (
          <li key={p._id}>{p.name} ({p.zalo_id})</li>
        ))}
      </ul>
    </div>
  );
}
