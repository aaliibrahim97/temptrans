@echo off

CALL:ECHOGREEN "Checking out v12 branches"
cd..
call git checkout -b ngv13 || goto :error


cd projects/atlp-air-ui
call git checkout -b ngv13 || goto :errors


cd air-ff-ui
call git checkout -b ngv13 || goto :error


cd ..
cd air-sp-ui
call git checkout -b ngv13 || goto :error


cd ../../../
cd projects/atlp-ecz-ui
call git checkout -b ngv13 || goto :error


cd projects\ecz-dls-ui
call git checkout -b ngv13 || goto :error


cd ..
cd ecz-wrc-ui
call git checkout -b ngv13 || goto :error


cd ..
cd ecz-lls-ui
call git checkout -b ngv13 || goto :error


cd ../../../../
cd projects/atlp-iac-ui
call git checkout -b ngv13 || goto :error


cd projects/iac-adafsa-ui
call git checkout -b ngv13 || goto :error


cd ..
cd iac-com-ui
call git checkout -b ngv13 || goto :error


cd ..
cd iac-dec-ui
call git checkout -b ngv13 || goto :error


cd ../../../../
cd projects/atlp-landing-ui
call git checkout -b ngv13 || goto :error


cd ..
cd atlp-lba-ui
call git checkout -b ngv13 || goto :error


cd ..
cd atlp-reg-ui
call git checkout -b ngv13 || goto :error


cd ..
cd atlp-sea-ui
call git checkout -b ngv13 || goto :error


cd ..
cd atlp-support-ui
call git checkout -b ngv13 || goto :error


cd ..
cd atlp-umg-ui
call git checkout -b ngv13 || goto :error


cd ..
cd atlp-business-portal
call git checkout -b ngv13 || goto :error


cd ..
cd atlp-vas-ui
call git checkout -b ngv13 || goto :error


cd projects/vas-tfin-ui
call git checkout -b ngv13 || goto :error



@pause
goto :EOF


:error
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Red \"Error occured kindly check if you're connected to Maqta VPN and do not have uncommitted changes\"
@pause

:ECHOGREEN
%Windir%\System32\WindowsPowerShell\v1.0\Powershell.exe write-host -foregroundcolor Green %1


