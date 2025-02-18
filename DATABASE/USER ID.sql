create table UserLogin(uid serial,email varchar(30),password varchar(30))
insert into UserLogin(email,password)values('atulsingh565@gmail.com','AKot@2002')
insert into UserLogin(email,password)values('aK5657@gmail.com','singh@2002')
insert into UserLogin(email,password)values('POOJA6@gmail.com','king@2002')
select * from UserLogin

drop table UserLogin
