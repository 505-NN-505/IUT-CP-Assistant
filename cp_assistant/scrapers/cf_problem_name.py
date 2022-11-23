import time
import json
import requests
from bs4 import BeautifulSoup
import re
import sys

def atcoder_scraper(problem_url):
    #problem_url = input()
    page = requests.get(problem_url)
    soup = BeautifulSoup(page.content, features='lxml')
    titleList = soup.find_all('title')
    # print(page.history)
    
    print(titleList[0].get_text())

def codeforces_scraper(problem_url):
    # url = input()
    parts = problem_url.split('/')
    
    problem_id = 0
    contest_id = 0
    problem_int = 0


    problem_int = 0
    problem_id = (parts[-1])
    if len(problem_id) == 2:
        problem_int = ord(problem_id[0]) - 65 + (int(problem_id[1]) - 1)
    else:
        problen_int = ord(problem_id) - 65
        # problem_int = problem_id - 65

    if parts[3] == "problemset":
        contest_id = (parts[-2])
    else:
        contest_id = (parts[-3])

    url = "https://codeforces.com/api/contest.standings?contestId=" + contest_id + "&from=1&count=1&showUnofficial=true"
    response = requests.get(url)
    print(response)
    content = response.json()
    content = content['result']['problems']
    print(content[problem_int]['name'])


url = "https://codeforces.com/problemset/problem/4/A"
parts = url.split('/')

is_codeforces = False
for part in parts:
	if part == 'codeforces.com':
		is_codeforces = True

if is_codeforces:
	codeforces_scraper(url)
else:
	atcoder_scraper(url)

