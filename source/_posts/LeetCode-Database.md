title: LeetCode Database
tags: leetcode
categories: 学习
date: 2015-06-16 06:37:02
---
[问题来源](https://leetcode.com/problemset/database/)

ps：吐槽下，貌似leetcode升级服务器硬件/软件了，同样的SQL不同时间提交，运行时间截然不同（变快了）。。。


### 合并两个表
表Person, PersonId为主键

```bash
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| PersonId    | int     |
| FirstName   | varchar |
| LastName    | varchar |
+-------------+---------+
```

表Address, AddressId为主键

```bash
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| AddressId   | int     |
| PersonId    | int     |
| City        | varchar |
| State       | varchar |
+-------------+---------+
```
- 写sql查询FirstName, LastName, City, State
- 包含Person中每个人，无论他是否有对应地址

```sql
select p.FirstName,p.LastName,a.City,a.State
from Person p left join Address a on p.PersonId=a.PersonId
```

TODO：更优解法

### 工资第二高
表Employee
```bash
+----+--------+
| Id | Salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
```
- 如果没有第二高的工资，则应该 **返回null**
- 错误思路：order by Salary desc limit 1,1

```sql
select max(Salary) from Employee where 
Salary <(
select max(Salary) from Employee
)
```

### 工资第n高
表Employee
```bash
+----+--------+
| Id | Salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
```

```sql
select max(Salary) from (
      select t1.Salary from Employee t1 where
      (select count(distinct t2.Salary)=N-1 from Employee t2 where t2.Salary>t1.Salary)
) t
```

Count+limit+DISTINCT:

```sql
SELECT e1.Salary
FROM (SELECT DISTINCT Salary FROM Employee)e1
WHERE (
  SELECT COUNT(Salary) FROM (SELECT DISTINCT Salary FROM Employee)e2 WHERE e1.Salary<e2.Salary
)=N-1
LIMIT 1
```

### 分数排名
表Scores
```bash
+----+-------+
| Id | Score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
```
结果
```bash
+-------+------+
| Score | Rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+
```
- 排名结果中同样的分数名次应该一样
- 名次相同记录后面的名次正常累加，不受名次是否相同、相同记录数影响

```sql
select t.Score,t.Rank from
(
select t1.Score,(select count(distinct t2.Score) from Scores t2 where t2.Score>=t1.Score) as Rank
from Scores t1
) t
order by t.Score desc
```

Pre-uniqued:
```sql
SELECT
  Score,
  (SELECT count(*) FROM (SELECT distinct Score s FROM Scores) tmp WHERE s >= Score) Rank
FROM Scores
ORDER BY Score desc
```

### 找出连续出现3次的数
表Logs
```bash
+----+-----+
| Id | Num |
+----+-----+
| 1  |  1  |
| 2  |  1  |
| 3  |  1  |
| 4  |  2  |
| 5  |  1  |
| 6  |  2  |
| 7  |  2  |
+----+-----+
```
上面示例中只有“1”满足条件
MySQL用户变量：
```sql
select distinct Num from (
    select Rank, min(Num) as Num, count(*) as c from (
        select Num,@curRank := @curRank + IF(@prevNum = Num, 0, 1) AS Rank,@prevNum := Num
        from Logs s,
            (select @curRank:=0) r,
            (select @prevNum:=0) p
        order by Id
    ) t1 group by Rank having c>=3
) t2;
```
sql自连接：
```sql
Select DISTINCT l1.Num as ConsecutiveNums
from Logs l1, Logs l2, Logs l3 
where l1.Id=l2.Id-1 and l2.Id=l3.Id-1 
and l1.Num=l2.Num and l2.Num=l3.Num
```

### 比老板工资高的员工
表Employee
```bash
+----+-------+--------+-----------+
| Id | Name  | Salary | ManagerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | NULL      |
| 4  | Max   | 90000  | NULL      |
+----+-------+--------+-----------+
```
返回结果示例
```bash
+----------+
| Employee |
+----------+
| Joe      |
+----------+
```
子查询，较慢：
```sql
select Name from Employee e1
where ManagerId is not null
and Salary>(select max(Salary) from Employee e2 where e2.Id=e1.Managerid) 
```
自连接，更快：
```sql
select E1.Name as Employee
from Employee as E1, Employee as E2 
where E1.ManagerId = E2.Id and E1.Salary > E2.Salary
```

### 找出重复的邮箱地址
表Person
```bash
+----+---------+
| Id | Email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
```
返回
```bash
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
```

使用group by较快：
```sql
select Email
from Person
group by Email
having count(*) > 1
```

### 从不下单的人
表Customers
```bash
+----+-------+
| Id | Name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
```
表Orders
```bash
+----+------------+
| Id | CustomerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
```
示例返回
```bash
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```

优化版子查询：
```sql
SELECT A.Name as Customers
from Customers A
WHERE NOT EXISTS (SELECT 1 FROM Orders B WHERE A.Id = B.CustomerId limit 1)
```

### 各部门最高工资
表Employee
```bash
+----+-------+--------+--------------+
| Id | Name  | Salary | DepartmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
```
表Department
```bash
+----+----------+
| Id | Name     |
+----+----------+
| 1  | IT       |
| 2  | Sales    |
+----+----------+
```
示例返回
```bash
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| Sales      | Henry    | 80000  |
+------------+----------+--------+
```

相关子查询：
```sql
select d.Name,t.Name,t.Salary
from Department d,(select e1.Name,e1.Salary,e1.DepartmentId from Employee e1,(select DepartmentId,max(Salary) as Salary from Employee group by DepartmentId) e2 where e1.Salary=e2.Salary and e1.DepartmentId=e2.DepartmentId) t
where d.Id=t.DepartmentId
```

优化版子查询：
```sql
SELECT D.Name as Department,A.Name as Employee,A.Salary 
FROM 
	Employee A,
	Department D   
WHERE A.DepartmentId = D.Id 
  AND NOT EXISTS 
  (SELECT 1 FROM Employee B WHERE B.Salary > A.Salary AND A.DepartmentId = B.DepartmentId) 
```

### 各部门前三高工资
表Employee
```bash
+----+-------+--------+--------------+
| Id | Name  | Salary | DepartmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
+----+-------+--------+--------------+
```
表Department
```bash
+----+----------+
| Id | Name     |
+----+----------+
| 1  | IT       |
| 2  | Sales    |
+----+----------+
```
示例返回
```bash
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| IT         | Randy    | 85000  |
| IT         | Joe      | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |
+------------+----------+--------+
```

相关子查询：
```sql
select d.Name,e.Name,e.Salary
from Department d,Employee e
where d.Id=e.DepartmentId
and (select count(distinct e1.Salary) from Employee e1 where e1.DepartmentId=e.DepartmentId and e1.Salary>e.Salary) < 3
order by d.Id,e.Salary desc
```

不使用order by：
```sql
select d.Name Department, e1.Name Employee, e1.Salary
from Employee e1 
join Department d
on e1.DepartmentId = d.Id
where 3 > (select count(distinct(e2.Salary)) 
                  from Employee e2 
                  where e2.Salary > e1.Salary 
                  and e1.DepartmentId = e2.DepartmentId
                  );
```

### 删除重复邮箱
表Person,主键为Id
```bash
+----+------------------+
| Id | Email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+
```
保留最小id记录，示例结果
```bash
+----+------------------+
| Id | Email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
```

[Multi-Table Deletes](http://dev.mysql.com/doc/refman/5.7/en/delete.html)

只有“FROM”前指定的表中的记录被删除
```sql
DELETE p1
FROM Person p1, Person p2
WHERE p1.Email = p2.Email AND
p1.Id > p2.Id
```

### 找出比前一天温度高的日期
表Weather
```bash
+---------+------------+------------------+
| Id(INT) | Date(DATE) | Temperature(INT) |
+---------+------------+------------------+
|       1 | 2015-01-01 |               10 |
|       2 | 2015-01-02 |               25 |
|       3 | 2015-01-03 |               20 |
|       4 | 2015-01-04 |               30 |
+---------+------------+------------------+
```
- TODO 简化问题的话，假设表中日期均连续且顺序与id一一对应，这样条件可以转化为Id比前一个大1

示例结果
```bash
+----+
| Id |
+----+
|  2 |
|  4 |
+----+
```
[日期函数](http://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_datediff)并不常用，还可以用上DATEDIFF等
```sql
select w1.Id
from Weather w1,Weather w2
where date_sub(w1.`Date`,interval 1 day)=w2.`Date` and w1.Temperature>w2.Temperature
```

### 计算退票率
表Trips
```bash
+----+-----------+-----------+---------+--------------------+----------+
| Id | Client_Id | Driver_Id | City_Id |        Status      |Request_at|
+----+-----------+-----------+---------+--------------------+----------+
| 1  |     1     |    10     |    1    |     completed      |2013-10-01|
| 2  |     2     |    11     |    1    | cancelled_by_driver|2013-10-01|
| 3  |     3     |    12     |    6    |     completed      |2013-10-01|
| 4  |     4     |    13     |    6    | cancelled_by_client|2013-10-01|
| 5  |     1     |    10     |    1    |     completed      |2013-10-02|
| 6  |     2     |    11     |    6    |     completed      |2013-10-02|
| 7  |     3     |    12     |    6    |     completed      |2013-10-02|
| 8  |     2     |    12     |    12   |     completed      |2013-10-03|
| 9  |     3     |    10     |    12   |     completed      |2013-10-03| 
| 10 |     4     |    13     |    12   | cancelled_by_driver|2013-10-03|
+----+-----------+-----------+---------+--------------------+----------+
```
- Id为主键
- Client_Id和Driver_Id都是Users表Users_Id字段的外键
- Status为ENUM类型，取值为(‘completed’, ‘cancelled_by_driver’, ‘cancelled_by_client’)

表Users
```bash
+----------+--------+--------+
| Users_Id | Banned |  Role  |
+----------+--------+--------+
|    1     |   No   | client |
|    2     |   Yes  | client |
|    3     |   No   | client |
|    4     |   No   | client |
|    10    |   No   | driver |
|    11    |   No   | driver |
|    12    |   No   | driver |
|    13    |   No   | driver |
+----------+--------+--------+
```
- Users_Id为主键
- Role为ENUM类型，取值为(‘client’, ‘driver’, ‘partner’)

现在需要查询从2013-10-01到2013-10-03每天未被封禁用户的退票率(四舍五入，保留两位小数)，示例结果
```bash
+------------+-------------------+
|     Day    | Cancellation Rate |
+------------+-------------------+
| 2013-10-01 |       0.33        |
| 2013-10-02 |       0.00        |
| 2013-10-03 |       0.50        |
+------------+-------------------+
```

- 退款状态为cancelled_by_client、cancelled_by_driver
- 封禁用户Banned为Yes

```sql
select Request_at as Day,round(sum(if(Status in ('cancelled_by_client', 'cancelled_by_driver'),1,0))/count(*),2) as `Cancellation Rate`
from Trips
where Client_Id not in (select Users_Id from Users where Banned='Yes')
and Request_at between '2013-10-01' and '2013-10-03'
group by Request_at;
```
