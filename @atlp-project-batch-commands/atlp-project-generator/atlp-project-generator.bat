@echo off

CALL:ECHOGREEN "Creating the new project under atlp portal."
set /p app_name=Please enter the application name: 

set /p project_path=Please enter the project path (default project): 

CALL ts-node ./atlp-project-generator-pre.ts %project_path%

CALL:ECHOGREEN "Please wait...!"
call ng g application %app_name% --style scss --routing true || goto :error
CALL:ECHOGREEN "Successfully generate the project...!"
echo.

CALL:ECHOGREEN "Please wait...! Initial project setup phase."
CALL:ECHOGREEN "Please provide required info for initial project setup...!"
call ng g @mg_core/atlp-project-init:atlp-project-init || goto :error
CALL:ECHOGREEN "Initial project setup completed successfully...!"
echo.

CALL:ECHOGREEN "Done"
@pause
goto :EOF

CALL ts-node ./atlp-project-generator-post.ts %project_path%

:error
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check the details you provided and try again...!\"
@pause

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


