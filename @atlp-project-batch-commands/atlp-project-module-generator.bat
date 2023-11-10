@ECHO OFF

CALL:ECHOGREEN "Creating the new module under specified project."

CALL:ECHOGREEN "Please wait...! Initial module generation phase."
CALL:ECHOGREEN "Please provide required info for module generation...!"
call ng g @mg_core/atlp-module-generator:atlp-module-generator || goto :error
CALL:ECHOGREEN "module generated successfully...!"
ECHO.

CALL:ECHOGREEN "Done"
@PAUSE
goto :EOF


:ERROR
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check the details you provided and try again...!\"
@PAUSE

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


