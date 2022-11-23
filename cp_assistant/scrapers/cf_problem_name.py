import requests
from bs4 import BeautifulSoup

def codeforces_scraper():
	# url = input()
	url = "https://codeforces.com/contest/1759/problem/C"
	page = requests.get(url,headers={"user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"},allow_redirects=TRUE)
	soup = BeautifulSoup(page.content, features='lxml')
	titleList = soup.find_all('title')
	print(soup, titleList)

codeforces_scraper()