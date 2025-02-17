create table visitor(vid serial,fullname varchar(30),contact varchar(30),purpose varchar(30),assignedto varchar(30),status varchar (30),dateofvisit TIMESTAMP DEFAULT NOW())
select * from visitor
insert into visitor(fullname,contact,purpose,assignedto,status)values('ATUL SINGH','7704036505','QUERY','SURESH SIR','PENDING');
insert into visitor(fullname,contact,purpose,assignedto,status)values('ANURAG','8787007689','ADMISSION','VIKASH SIR','RESOLVED');
insert into visitor(fullname,contact,purpose,assignedto,status)values('AMIT SINGH','7704036505','QUERY','SURESH SIR','RESOLVED');
insert into visitor(fullname,contact,purpose,assignedto,status)values('AKSHITA SINGH','7704036505','QUERY','SURESH SIR','PENDING');
insert into visitor(fullname,contact,purpose,assignedto,status)values('PRIYANSH SINGH','7704036505','QUERY','SURESH SIR','RESOLVED');
drop table visitor;