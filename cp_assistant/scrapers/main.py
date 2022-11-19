import codeforces
import atcoder

import time
import json
import requests
from bs4 import BeautifulSoup
import re
import sys
import json


# users = ["Shahriar118", "IAlsoHateMyself", "chroot_", "_labib", "ssshanto"]

# for user in users:
#     print(codeforces.getUserInfo(user))
#     print(atcoder.getUserInfo(user))

username = sys.argv[1]

print(codeforces.getUserInfo(username))