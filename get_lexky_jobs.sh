wget --no-check-certificate https://jobs.lexingtonky.gov/psc/candidate/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_CE.GBL --output-document='raw_jobs.html'
node app.js > jobs.html
aws s3 cp jobs.html s3://erik-devel/jobs.html --content-type "text/xml"
