@ECHO OFF
CD ..

CALL:ECHOGREEN "Please make sure you are in parent submodule folder before continuing...!"
CALL:ECHOGREEN "Please enter parent submodule path."
SET /p parent_submodule_path=Please enter parent submodule path(eg: . or projects/atlp-demo-ui):
CD %parent_submodule_path%

CALL:ECHOGREEN "Creating git sub module project under atlp portal."
SET /p git_sub_module_path=Please enter the project path(eg: projects/atlp-demo-ui):
 

CALL:ECHOGREEN "Please wait...! git submodules init in progress."
CALL git submodule init || goto :ERROR
CALL:ECHOGREEN "Successfully init the submodule...!"
ECHO.

CALL:ECHOGREEN "Please wait...! Updating git submodules."
call git submodule update --remote %git_sub_module_path% || goto :error
@REM CALL git submodule update --remote projects/atlp-sea-ui
@REM call git submodule update --remote projects/atlp-sea-ui || goto :error
@REM call git submodule update --init || goto :error
CALL:ECHOGREEN "Submodule updated successfully"
ECHO.

CALL:ECHOGREEN "Done"
@PAUSE
goto :EOF


:ERROR
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check the details you provided and try again...!\"
@PAUSE

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


