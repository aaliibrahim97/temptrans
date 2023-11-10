cd..
call git submodule init 
call git submodule update --remote projects/atlp-dashboard-ui
cd projects/atlp-dashboard-ui
call git submodule init
call git submodule update --remote projects/dashboard-widgets
