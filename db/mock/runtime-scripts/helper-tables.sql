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
create table Tools as select distinct result as tool from EventLog;

DROP TABLE IF EXISTS `Years`;
create table Years as SELECT distinct Year(actionTime) as year FROM `bsc-dev-db`.EventLog;

DROP TABLE IF EXISTS `Months`;
create table Months as SELECT distinct Month(actionTime) as month FROM `bsc-dev-db`.EventLog;




/*
# ##################################################
# ## HELPER TABLES TOTAL PAGE
# ################################################## 
*/
-- 1) querry - total usage by year
DROP TABLE IF EXISTS `TotalUsageByYear`;
create table TotalUsageByYear as
    (select tool , year ,( select count(*) from EventLog y 
    where y.action like CONCAT( '%' , x.tool , '%' ) and year(y.actionTime) = z.year) as total 
    from Tools x , Years z 
    group by tool , year , total );


-- 2) querry - total usage through a year
DROP TABLE IF EXISTS `TotalUsageThroughYear`;
create table TotalUsageThroughYear as
    (select year , month, (select count(*) from EventLog z where year(z.actionTime) = x.year and month(z.actionTime) = y.month ) as total 
    from Years x , Months y 
    group by year , month ,total);


-- 3) querry - total usage by OS -- itt számolhatjuk tetszőleges kapcsoló táblából ugyanis az összes event-hez tartozó software-user-location ugyanazt a studioref-et kapja soronként
DROP VIEW IF EXISTS `StudiosWithSoftwareIds`;
create view StudiosWithSoftwareIds as 
    select y.id, y.computerOS , x.id as SoftwareId 
    from StudioInstance as y , StudioSoftware as x 
    where y.id = x.idStudioRef 
    order by computerOS;

DROP TABLE IF EXISTS `TotalUsageByOS`;
create table TotalUsageByOS as 
    select y.computerOS , count(x.id) from EventLog as x , StudiosWithSoftwareIds as y 
    where y.SoftwareId = x.idStudioSoftwareRef group by y.computerOS;


-- 4) querry - total / region
DROP VIEW IF EXISTS `LocationsWithLocationIds`; -- get locationRefIds to every country
create view LocationsWithLocationIds as 
    select y.id, y.region, y.country ,y.state, y.city, y.isp , x.id as LocationId 
    from Location as y,  StudioLocation as x 
    where y.id = x.idLocationRef;

-- count by countries
DROP TABLE IF EXISTS `TotalUsageByCountries`;
create table TotalUsageByCountries as 
    select y.country as country, count(x.id) as total
    from EventLog as x , LocationsWithLocationIds as y 
    where y.LocationId = x.idStudioLocationRef group by y.country;



-- 7) querry - weighted countries and states and cities by region
create table TotalUsageByRegions as 
    select y.region , y.country , y.state , y.city , count(x.id) 
    from EventLog x , LocationsWithLocationIds as y 
    where y.LocationId = x.idStudioLocationRef group by y.region , y.country, y.state , y.city;