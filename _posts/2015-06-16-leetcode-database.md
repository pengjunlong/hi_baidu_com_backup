---
layout: article
title: LeetCode Database
time: 2013-09-24 19:01:47
tags: 好好学习天天向上
---

{% highlight SQL %}
# Write your MySQL query statement below
select d.Name,e.Name,e.Salary
from Department d,Employee e
where d.Id=e.DepartmentId
and (select count(distinct e1.Salary) from Employee e1 where e1.DepartmentId=e.DepartmentId and e1.Salary>e.Salary) < 3
order by d.Id,e.Salary desc
{% endhighlight %}

<div class="question-content">
              <p></p><p>
The <code>Employee</code> table holds all employees. Every employee has an Id, and there is also a column for the department Id.</p>

<pre>+----+-------+--------+--------------+
| Id | Name  | Salary | DepartmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
+----+-------+--------+--------------+
</pre>

<p>
The <code>Department</code> table holds all departments of the company.</p>
<pre>+----+----------+
| Id | Name     |
+----+----------+
| 1  | IT       |
| 2  | Sales    |
+----+----------+
</pre>

<p>Write a SQL query to find employees who earn the top three salaries in each of the department. For the above tables, your SQL query should return the following rows.</p>

<pre>+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| IT         | Randy    | 85000  |
| IT         | Joe      | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |
+------------+----------+--------+
</pre><p></p>
              
            </div>
