@echo off

CALL:ECHOGREEN "Getting latest from atlp-portal-ui ngv13 branch"

cd..
call git checkout ngv13 || goto :error
call git pull || goto :error

CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-air-ui ngv13 branch"
cd projects/atlp-air-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-ff-ui ngv13 branch"
cd air-ff-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from air-sp-ui ngv13 branch"
cd ..
cd air-sp-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-ecz-ui ngv13 branch"
cd ../../../
cd projects/atlp-ecz-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-dls-ui ngv13 branch"
cd projects\ecz-dls-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-wrc-ui ngv13 branch"
cd ..
cd ecz-wrc-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-lls-ui ngv13 branch"
cd ..
cd ecz-lls-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-iac-ui ngv13 branch"
cd ../../../../
cd projects/atlp-iac-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-adafsa-ui ngv13 branch"
cd projects/iac-adafsa-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-com-ui ngv13 branch"
cd ..
cd iac-com-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-dec-ui ngv13 branch"
cd ..
cd iac-dec-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-landing-ui ngv13 branch"
cd ../../../../
cd projects/atlp-landing-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-lba-ui ngv13 branch"
cd ..
cd atlp-lba-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-reg-ui ngv13 branch"
cd ..
cd atlp-reg-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-sea-ui ngv13 branch"
cd ..
cd atlp-sea-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-support-ui ngv13 branch"
cd ..
cd atlp-support-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-umg-ui ngv13 branch"
cd ..
cd atlp-umg-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-business-portal ngv13 branch"
cd ..
cd atlp-business-portal
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from vas-tfin-ui ngv13 branch"
cd ..
cd atlp-vas-ui/projects/vas-tfin-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from vas-insm-ui ngv13 branch"
cd ..
cd vas-insm-ui
call git checkout ngv13 || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Successfully take latest from all branches...!"
@pause
goto :EOF


:error
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check if you're connected to Maqta VPN and do not have uncommitted changes\"
@pause

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


