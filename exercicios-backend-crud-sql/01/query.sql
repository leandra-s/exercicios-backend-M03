
create database exercicio_crud_sql;

--cria a tabela
create table usuarios (
	id serial,
  	nome text not null,
  	idade smallint,
  	email varchar(50),
  	senha varchar(8) not null
);


--insere os usuarios
insert into usuarios
(nome, idade, email, senha)
values
('Aretha Montgomery', 30, 'augue.id.ante@odioAliquam.com', 'a0B13O3L'),
('Camden H. Bartlett', 15, 'turpis.vitae.purus@risusDuisa.ca', 'p3P96F3Q'),
('Raja W. Coffey', 30, 'raja.feugiat@nonummy.com', 's5F51T7L'),
('Elton D. Olsen', 29, 'auctor@duiFuscediam.edu', 'k5X25B0R'),
('Shelley E. Frederick', 20, 'raja.feugiat@nonummy.com', 'u2D18F6E');


--atualiza alguns dados
update usuarios 
set nome = 'Raja W. Coffey Thomas'
where email = 'raja.feugiat@nonummy.com';


--deleta um usuario
delete from usuarios where id = 5;


--email unico
alter table usuarios add constraint email_unique_usuarios unique(email);


--insere mais usuarios
insert into usuarios
(nome, idade, email, senha)
values
('Jermaine G. Sellers', 16, 'ligula.Nullam@tortordictum.co.uk', 'o2P56U9U'),
('James D. Kennedy', 23, 'amet@Nulladignissim.com', 'q6B78V3V'),
('Amelia S. Harris', 29, 'nec.metus.facilisis@vitaealiquet.edu', 'l4S64Y3A'),
('Joel M. Hartman', 18, 'montes.nascetur@odiotristique.co.uk', 'c4Q27D7O'),
('Elmo K. Greer', 18, 'risus.Duis@eget.ca', 'e3P92I7R');


--adiciona a coluna situaçao true
alter table usuarios add column situacao boolean default true;


--atualiza um usuario
update usuarios
set situacao = false
where email = 'montes.nascetur@odiotristique.co.uk';


--atualiza outro usuario
update usuarios
set senha = 'k9P31H1O'
where email = 'risus.Duis@eget.ca';


--tira a coluna idade e adiciona a data_nascimento
alter table usuarios drop column idade, add column data_nascimento date;


--atualiza um usuario
update usuarios
set data_nascimento = '1991-09-29'
where email = 'auctor@duiFuscediam.edu';


--atualiza outro usuario
update usuarios
set data_nascimento = '1988-11-02'
where email = 'nec.metus.facilisis@vitaealiquet.edu';


--deleta campos nulos da data de nascimento
delete from usuarios 
where data_nascimento is null;


--data de nascimento obrigatorio
alter table usuarios alter column data_nascimento set not null;


--insere mais usuarios
insert into usuarios
(nome, email, senha, data_nascimento)
values
('Tate I. Dean', 'Nunc@etmagnis.edu', 'd3V25D6Y', '1989-05-01'),
('Arsenio K. Harmon', 'adipiscing.elit@turpis.com', 'm3T58S0C', '1985-10-23');