const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'college',
  waitForConnections: true, connectionLimit: 10, dateStrings: true
});
const fields = ['event_name','event_type','event_date','venue','description'];
function validate(body, includeId=false) {
  if (includeId && (!Number.isInteger(Number(body.event_id)) || Number(body.event_id) < 1)) return 'A valid positive event_id is required.';
  for (const key of ['event_name','event_type','event_date','venue']) if (!String(body[key] ?? '').trim()) return `${key} is required.`;
  return null;
}
app.get('/events', async (req,res) => { try { const [rows] = await pool.query('SELECT event_id,event_name,event_type,event_date,venue,description FROM events ORDER BY event_date DESC, event_id DESC'); res.json(rows); } catch(e) { console.error(e); res.status(500).json({error:'Could not load events. Check MySQL connection and college.events table.'}); } });
app.get('/events/:id', async (req,res) => { try { const [rows] = await pool.execute('SELECT event_id,event_name,event_type,event_date,venue,description FROM events WHERE event_id=?',[req.params.id]); if(!rows.length) return res.status(404).json({error:'Event not found.'}); res.json(rows[0]); } catch(e) { console.error(e); res.status(500).json({error:'Could not find event.'}); } });
app.post('/events', async (req,res) => { const error=validate(req.body,true); if(error) return res.status(400).json({error}); try { await pool.execute('INSERT INTO events (event_id,event_name,event_type,event_date,venue,description) VALUES (?,?,?,?,?,?)',[Number(req.body.event_id),req.body.event_name.trim(),req.body.event_type,req.body.event_date,req.body.venue.trim(),req.body.description || '']); res.status(201).json({message:'Event added successfully.'}); } catch(e) { console.error(e); res.status(e.code==='ER_DUP_ENTRY'?409:500).json({error:e.code==='ER_DUP_ENTRY'?'That event ID already exists.':'Could not add event. Check table columns and values.'}); } });
app.put('/events/:id', async (req,res) => { const error=validate(req.body); if(error) return res.status(400).json({error}); try { const [result]=await pool.execute('UPDATE events SET event_name=?,event_type=?,event_date=?,venue=?,description=? WHERE event_id=?',[req.body.event_name.trim(),req.body.event_type,req.body.event_date,req.body.venue.trim(),req.body.description || '',req.params.id]); if(!result.affectedRows) return res.status(404).json({error:'Event not found.'}); res.json({message:'Event updated successfully.'}); } catch(e) { console.error(e); res.status(500).json({error:'Could not update event. Check table columns and values.'}); } });
app.delete('/events/:id', async (req,res) => { try { const [result]=await pool.execute('DELETE FROM events WHERE event_id=?',[req.params.id]); if(!result.affectedRows) return res.status(404).json({error:'Event not found.'}); res.json({message:'Event deleted successfully.'}); } catch(e) { console.error(e); res.status(500).json({error:'Could not delete event.'}); } });
app.get('/health', async (_req,res) => { try { await pool.query('SELECT 1'); res.json({ok:true,database:process.env.DB_NAME || 'college'}); } catch { res.status(503).json({ok:false,error:'Database connection failed'}); } });
app.get('*', (req,res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`College Event Management running at http://localhost:${PORT}`));
