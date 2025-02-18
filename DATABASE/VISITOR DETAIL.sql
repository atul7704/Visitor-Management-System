create table visitor(vid serial,fullname varchar(30),contact varchar(30),purpose varchar(30),assignedto varchar(30),status varchar (30),dateofvisit TIMESTAMP DEFAULT NOW())
select * from visitor
insert into visitor(fullname,contact,purpose,assignedto,status)values('ATUL SINGH','7757036505','QUERY','SURESH SIR','PENDING');
insert into visitor(fullname,contact,purpose,assignedto,status)values('ANURAG','878575689','ADMISSION','VIKASH SIR','RESOLVED');
insert into visitor(fullname,contact,purpose,assignedto,status)values('AMIT SINGH','779788605','QUERY','SURESH SIR','RESOLVED');
insert into visitor(fullname,contact,purpose,assignedto,status)values('AKSHITA SINGH','7704453605','QUERY','SURESH SIR','PENDING');
insert into visitor(fullname,contact,purpose,assignedto,status)values('PRIYANSH SINGH','770978505','QUERY','SURESH SIR','RESOLVED');
drop table visitor;
