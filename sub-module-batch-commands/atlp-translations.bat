@echo off

CALL:ECHOGREEN "Getting latest from atlp-portal-ui dev branch"

call git checkout dev || goto :error
call git pull || goto :error

CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-air-ui dev branch"
cd projects/atlp-air-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-ff-ui dev branch"
cd air-ff-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from air-sp-ui dev branch"
cd ..
cd air-sp-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-ecz-ui dev branch"
cd ../../../
cd projects/atlp-ecz-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-dls-ui dev branch"
cd projects\ecz-dls-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-wrc-ui dev branch"
cd ..
cd ecz-wrc-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from ecz-lls-ui dev branch"
cd ..
cd ecz-lls-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-iac-ui dev branch"
cd ../../../../
cd projects/atlp-iac-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-adafsa-ui dev branch"
cd projects/iac-adafsa-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-com-ui dev branch"
cd ..
cd iac-com-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from iac-dec-ui dev branch"
cd ..
cd iac-dec-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-landing-ui dev branch"
cd ../../../../
cd projects/atlp-landing-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-lba-ui dev branch"
cd ..
cd atlp-lba-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-reg-ui dev branch"
cd ..
cd atlp-reg-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-sea-ui dev branch"
cd ..
cd atlp-sea-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-support-ui dev branch"
cd ..
cd atlp-support-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-umg-ui dev branch"
cd ..
cd atlp-umg-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from atlp-business-portal dev branch"
cd ..
cd atlp-business-portal
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Getting latest from vas-tfin-ui dev branch"
cd ..
cd atlp-vas-ui/projects/vas-tfin-ui
call git checkout dev || goto :error
call git pull || goto :error
CALL:ECHOGREEN "Done"
echo.

CALL:ECHOGREEN "Generating Translations"
cd ../../
call npm run local:atlp-landing-ui || goto :error

CALL:ECHOGREEN "All Translations updated successfully!"
@pause
goto :EOF


:error
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check if you're connected to Maqta VPN and do not have uncommitted changes\"
@pause

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


