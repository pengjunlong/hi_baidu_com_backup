---
title: Leetcode Database
---

[LeetCode OJ](https://leetcode.com/problemset/database/)

### Customers Who Never Order
<!--more-->
Suppose that a website contains two tables, the Customers table and the Orders table. Write a SQL query to find all customers who never order anything.

Table: Customers.

``` bash
+----+-------+
| Id | Name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
```

Table: Orders.

``` bash
+----+------------+
| Id | CustomerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
```

Using the above tables as example, return the following:

``` bash
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```

#### answer

``` sql
select Name from Customers
where Id not in
(select CustomerId from Orders)
```
