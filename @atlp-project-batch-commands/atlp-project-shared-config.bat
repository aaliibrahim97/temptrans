@ECHO OFF

CALL:ECHOGREEN "Please wait...! common shared service configuration in progress."
call ng g @mg_core/atlp-project-init:atlp-project-shared || goto :ERROR
CALL:ECHOGREEN "Initial project setup completed successfully...!"
ECHO.

CALL:ECHOGREEN "Done"
@PAUSE
goto :EOF


:ERROR
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check the details you provided and try again...!\"
@PAUSE

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


