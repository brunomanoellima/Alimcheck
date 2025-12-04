@echo off

:: --- CONFIGURACOES --- 
SET BACKUP_PATH="C:\Users\carlos\Documents\AlimCheck_Oficial\backups_alimcheck"
SET MYSQLDUMP_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"

:: Cria a pasta de backup se ela ainda nao existir
if not exist %BACKUP_PATH% mkdir %BACKUP_PATH%

:: Pega a data atual do sistema 
SET ANO=%date:~6,4%
SET MES=%date:~3,2%
SET DIA=%date:~0,2%
SET DATA_FORMATADA=%ANO%-%MES%-%DIA%

:: Define o nome do arquivo com a data formatada
SET FILENAME=%BACKUP_PATH%\backup_alimcheck_%DATA_FORMATADA%.sql

:: --- COMANDO DE BACKUP ---
echo Realizando backup do banco 'alimcheck_db' para %FILENAME% ...
%MYSQLDUMP_PATH% --host=127.0.0.1 --port=3306 -u root -p123456 alimcheck_db > %FILENAME%

echo.
echo Backup concluido com sucesso!
