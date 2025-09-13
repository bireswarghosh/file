// Backend API Routes for Department Indoor
// Add these routes to your Express.js server

const express = require('express');
const router = express.Router();

// GET /api/departmentindoor - Get all departments with search and pagination
router.get('/', async (req, res) => {
  try {
    const { search = '', page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM departmentindoor';
    let countQuery = 'SELECT COUNT(*) as total FROM departmentindoor';
    const params = [];
    
    if (search) {
      query += ' WHERE Department LIKE ?';
      countQuery += ' WHERE Department LIKE ?';
      params.push(`%${search}%`);
    }
    
    query += ' ORDER BY Department LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const [departments] = await db.execute(query, params);
    const [countResult] = await db.execute(countQuery, search ? [`%${search}%`] : []);
    
    res.json({
      success: true,
      data: departments,
      total: countResult[0].total,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/departmentindoor/:id - Get single department
router.get('/:id', async (req, res) => {
  try {
    const [departments] = await db.execute(
      'SELECT * FROM departmentindoor WHERE DepartmentId = ?',
      [req.params.id]
    );
    
    if (departments.length === 0) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    
    res.json({ success: true, data: departments[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/departmentindoor - Create new department
router.post('/', async (req, res) => {
  try {
    const { Department, DepGroupId, MinAdv, MaxBalance, Referal, PSL, RateType } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO departmentindoor (Department, DepGroupId, MinAdv, MaxBalance, Referal, PSL, RateType) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Department, DepGroupId || null, MinAdv || 0, MaxBalance || 0, Referal || 0, PSL || 0, RateType || 0]
    );
    
    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: { DepartmentId: result.insertId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/departmentindoor/:id - Update department
router.put('/:id', async (req, res) => {
  try {
    const { Department, DepGroupId, MinAdv, MaxBalance, Referal, PSL, RateType } = req.body;
    
    const [result] = await db.execute(
      'UPDATE departmentindoor SET Department = ?, DepGroupId = ?, MinAdv = ?, MaxBalance = ?, Referal = ?, PSL = ?, RateType = ? WHERE DepartmentId = ?',
      [Department, DepGroupId || null, MinAdv || 0, MaxBalance || 0, Referal || 0, PSL || 0, RateType || 0, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    
    res.json({ success: true, message: 'Department updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/departmentindoor/:id - Delete department
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM departmentindoor WHERE DepartmentId = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    
    res.json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/departmentindoor/group/:groupId - Get departments by group
router.get('/group/:groupId', async (req, res) => {
  try {
    const [departments] = await db.execute(
      'SELECT * FROM departmentindoor WHERE DepGroupId = ? ORDER BY Department',
      [req.params.groupId]
    );
    
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;