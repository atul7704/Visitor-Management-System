create table UserLogin(uid serial,email varchar(30),password varchar(30))
insert into UserLogin(email,password)values('atulsingh5682@gmail.com','Chhotu@2002')
insert into UserLogin(email,password)values('atulsingh3170@gmail.com','Atulsingh@2002')
insert into UserLogin(email,password)values('atulsingh3170446@gmail.com','Singhisking@2002')
select * from UserLogin

drop table UserLogin