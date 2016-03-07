# Grab jobs from jobs.lexingtonky.gov and output as RSS

## Deploy

Set up cron to fetch jobs

`crontab -e`

`30 * * * * cd ~/path/to/repo && get_lexky_jobs.sh`


