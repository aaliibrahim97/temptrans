@echo off

@REM CALL:ECHOGREEN "Getting latest from atlp-portal-ui atlp-dev-changes branch"
CALL:ECHOGREEN "Getting latest from atlp-portal-ui dev branch"

cd ..
CALL:ECHOGREEN %cd%
@REM call git checkout atlp-dev-changes || goto :error
call git checkout dev || goto :error
call git pull || goto :error

CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-air-ui dev branch"
cd projects/atlp-air-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-ff-ui dev branch"
cd air-ff-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from air-sp-ui dev branch"
cd ..
cd air-sp-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-ecz-ui dev branch"
cd ../../../
cd projects/atlp-ecz-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-dls-ui dev branch"
cd projects\ecz-dls-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.


CALL:ECHOGREEN "Getting latest from ecz-kls-ui dev branch"
cd ..
cd ecz-kls-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-kta-ui dev branch"
cd ..
cd ecz-kta-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-leasing-ui dev branch"
cd ..
cd ecz-leasing-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-wrc-ui dev branch"
cd ..
cd ecz-wrc-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from vas-dls-ui dev branch"
cd ..
cd vas-dls-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-lls-ui dev branch"
cd ..
cd ecz-lls-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-dashboard-ui dev branch"
cd ..
cd ecz-dashboard-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-sef-ui dev branch"
cd ..
cd ecz-sef-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-ciz-ui dev branch"
cd ..
cd ecz-ciz-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-dashboard-ui dev branch"
cd ../../../../
cd projects/atlp-dashboard-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from dashboard-shell dev branch"
cd projects/dashboard-shell
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from dashboard-widgets dev branch"
cd ..
cd dashboard-widgets
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from pbi-dashboard-ui dev branch"
cd ..
cd pbi-dashboard-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-iac-ui dev branch"
cd ../../../../
cd projects/atlp-iac-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-adafsa-ui dev branch"
cd projects/iac-adafsa-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-dec-ui dev branch"
cd ..
cd iac-dec-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-ded-ui dev branch"
cd ..
cd iac-ded-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-landing-ui dev branch"
cd ..\..\..\..\
cd projects/atlp-landing-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-lba-ui dev branch"
cd ..
cd atlp-lba-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-reg-ui dev branch"
cd ..
cd atlp-reg-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-sea-ui dev branch"
cd ..
cd atlp-sea-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-support-ui dev branch"
cd ..
cd atlp-support-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-umg-ui dev branch"
cd ..
cd atlp-umg-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-angular-elements-ui dev branch"
cd ..
cd atlp-angular-elements-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from custom-elements-shell dev branch"
cd projects/custom-elements-shell
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-business-portal dev branch"
cd ../../../
cd atlp-business-portal
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from vas-tfin-ui dev branch"
cd ..
cd atlp-vas-ui/projects/vas-tfin-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from vas-insm-ui dev branch"
cd ..
cd vas-insm-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-epass-ui dev branch"
cd ../../../../
cd projects/atlp-epass-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-demo-ui dev branch"
cd ..
cd atlp-demo-ui
CALL:ECHOGREEN %cd%
call git checkout dev || goto :error
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


