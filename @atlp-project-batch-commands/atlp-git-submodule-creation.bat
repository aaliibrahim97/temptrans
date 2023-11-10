@ECHO OFF
CD ..

CALL:ECHOGREEN "Creating git sub module project under atlp portal."
SET /p git_repo_url=Please enter git repo full url without branch(eg: http://10.0.131.131/atlp/atlp_ui/atlp_ui_submodules/atlp-demo-ui):
SET /p git_sub_module_path=Please enter the project path(eg: projects/atlp-demo-ui):
 

CALL:ECHOGREEN "Please wait...! Updating git submodules."
CALL git submodule add %git_repo_url% || GOTO :ERROR
CALL:ECHOGREEN "Successfully added the submodule...!"
ECHO.

CALL:ECHOGREEN "Please wait...! Updating git submodules."
CALL git submodule update --remote %git_sub_module_path% || GOTO :ERROR
CALL:ECHOGREEN "Successfully updated the submodule...!"
ECHO.

CALL:ECHOGREEN "Done"
@PAUSE
goto :EOF


:ERROR
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check the details you provided and try again...!\"
@PAUSE

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


