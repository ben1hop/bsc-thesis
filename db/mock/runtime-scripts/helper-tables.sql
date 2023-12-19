USE `bsc-dev-db`;
/*
# ##################################################
# ## HELPER TABLES COMMON
# ################################################## 
*/
-- Countries common table
DROP TABLE IF EXISTS `Countries`;
create table Countries as select distinct id , country from Location;

-- OSTypes common table
DROP TABLE IF EXISTS `OSTypes`;
create table OSTypes as select distinct computerOS from StudioInstance;

-- Regions common table
DROP TABLE IF EXISTS `Regions`;
create table Regions as select distinct region from Location;

DROP TABLE IF EXISTS `Tools`;
create table Tools as select distinct result as tool from EventLog order by result;

DROP TABLE IF EXISTS `Years`;
create table Years as SELECT distinct Year(actionTime) as year FROM `bsc-dev-db`.EventLog;

DROP TABLE IF EXISTS `Months`;
create table Months as SELECT distinct Month(actionTime) as month FROM `bsc-dev-db`.EventLog;

DROP TABLE IF EXISTS `Actions`;
create table Actions as SELECT distinct action FROM `bsc-dev-db`.EventLog;




/*
# ##################################################
# ## HELPER TABLES TOTAL PAGE
# ################################################## 
*/
-- 1) querry - total usage by year
DROP TABLE IF EXISTS `TotalUsageByYear`;
create table TotalUsageByYear as
    select result as tool , year(actionTime) as year , count(*) as total 
    from EventLog 
    group by result, year(actionTime) 
    order by tool, year;


-- 2) querry - total usage through a year
DROP TABLE IF EXISTS `TotalUsageThroughYear`;
create table TotalUsageThroughYear as
    (select year , month, (select count(*) from EventLog z where year(z.actionTime) = x.year and month(z.actionTime) = y.month ) as total 
    from Years x , Months y 
    group by year , month ,total)
    order by year, month;

DROP TABLE IF EXISTS `TotalUsageTimeSpan`;
create table TotalUsageTimeSpan as
    SELECT hour(actionTime) as hour, count(id) as total FROM `bsc-dev-db`.EventLog group by hour(actionTime) order by hour;


-- 3) querry - total usage by OS -- itt számolhatjuk tetszőleges kapcsoló táblából ugyanis az összes event-hez tartozó software-user-location ugyanazt a studioref-et kapja soronként
DROP VIEW IF EXISTS `StudiosWithSoftwareIds`;
create view StudiosWithSoftwareIds as 
    select y.id, y.computerOS , x.id as SoftwareId 
    from StudioInstance as y , StudioSoftware as x 
    where y.id = x.idStudioRef 
    order by computerOS;

DROP TABLE IF EXISTS `TotalUsageByOS`;
create table TotalUsageByOS as 
    select y.computerOS , count(x.id) as total from EventLog as x , StudiosWithSoftwareIds as y 
    where y.SoftwareId = x.idStudioSoftwareRef group by y.computerOS;

DROP TABLE IF EXISTS `TotalUsageByOS_Year`;
create table TotalUsageByOS_Year as 
    select y.computerOS , year(x.actionTime) as year, count(x.id) as total
    from EventLog as x , StudiosWithSoftwareIds as y 
    where y.SoftwareId = x.idStudioSoftwareRef group by y.computerOS, year(x.actionTime)
    order by computerOS, year;


-- 4) querry - total / region
DROP VIEW IF EXISTS `LocationsWithLocationIds`; -- get locationRefIds to every country
create view LocationsWithLocationIds as 
    select y.id, y.region, y.country ,y.state, y.city, y.isp , x.id as LocationId 
    from Location as y,  StudioLocation as x 
    where y.id = x.idLocationRef;

-- count by regions
DROP TABLE IF EXISTS `TotalUsageByRegion`;
create table TotalUsageByRegion as 
    select y.country as country, count(x.id) as total
    from EventLog as x , LocationsWithLocationIds as y 
    where y.LocationId = x.idStudioLocationRef group by y.country;

-- count by countries --- for weighted: SELECT country , sum(total) as total FROM `bsc-dev-db`.TotalUsageByCountries group by country;
DROP TABLE IF EXISTS `TotalUsageByCountries`;
create table TotalUsageByCountries as
    select  y.country ,year(x.actionTime) as year , count(x.id) as total
    from EventLog x , LocationsWithLocationIds as y 
    where y.LocationId = x.idStudioLocationRef 
    group by y.country ,year(x.actionTime) 
    order by country, year;


-- 6) count the number of actions
DROP TABLE IF EXISTS `TotalUsageByAction`;
create table TotalUsageByAction as 
    SELECT action, count(id) as total FROM `bsc-dev-db`.EventLog group by action;





/*
# ##################################################
# ## HELPER TABLES PER TOOL PAGE
# ################################################## 
*/
-- 1) Stacked quarterly data through years
DROP TABLE IF EXISTS `PerToolYearlyWithQuarter`;
create table PerToolYearlyWithQuarter as 
    SELECT 
        result AS tool,
        year(actionTime) AS year,
        CONCAT('Q', ((month(actionTime) - 1) DIV 3) + 1) AS quarter,
        COUNT(*) AS total
    FROM 
        EventLog
    GROUP BY 
        result,
        year(actionTime),
        quarter
    ORDER BY 
        tool,
        year,
        quarter;

-- 2) Tool usage by countries
DROP TABLE IF EXISTS `PerToolRegion`;
create table PerToolRegion as 
    select x.result as tool, y.country as country, count(x.id) as total 
    from EventLog as x , LocationsWithLocationIds as y 
    where y.LocationId = x.idStudioLocationRef
    group by x.result , y.country
    order by tool, country;





/*
# ##################################################
# ## HELPER TABLES COMPARE PAGE
# ################################################## 
*/
DROP TABLE IF EXISTS `CompareTables`;
create table CompareTables as
    select result , year(actionTime) as years, count(id) as total, min(actionTime) as first 
    from EventLog group by result, year(actionTime) 
    order by result, years;
