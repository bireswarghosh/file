-- Optimized SQL queries for departmentindoor table

-- 1. Get all departments with pagination and search
SELECT * FROM departmentindoor 
WHERE Department LIKE '%search_term%' 
ORDER BY Department 
LIMIT 50 OFFSET 0;

-- 2. Get departments by group (fastest for filtering)
SELECT * FROM departmentindoor 
WHERE DepGroupId = ? 
ORDER BY Department;

-- 3. Get departments by rate type
SELECT * FROM departmentindoor 
WHERE RateType = ? 
ORDER BY Department;

-- 4. Get department with group info (JOIN query)
SELECT d.*, dg.DepGroup 
FROM departmentindoor d 
LEFT JOIN departmentgroup dg ON d.DepGroupId = dg.DepGroupId 
WHERE d.DepartmentId = ?;

-- 5. Count total departments for pagination
SELECT COUNT(*) as total FROM departmentindoor 
WHERE Department LIKE '%search_term%';

-- 6. Get departments with financial summary
SELECT 
  DepartmentId,
  Department,
  DepGroupId,
  MinAdv,
  MaxBalance,
  Referal,
  (MinAdv + MaxBalance + Referal) as TotalAmount
FROM departmentindoor 
ORDER BY TotalAmount DESC;

-- Indexes for performance (run these on your database)
CREATE INDEX idx_department_name ON departmentindoor(Department);
CREATE INDEX idx_dep_group_id ON departmentindoor(DepGroupId);
CREATE INDEX idx_rate_type ON departmentindoor(RateType);
CREATE INDEX idx_department_search ON departmentindoor(Department, DepGroupId);