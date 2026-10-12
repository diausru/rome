import sys,urllib.request
B='https://d8j0ntlcm91z4.cloudfront.net/user_34B6c4N28uYxNknSTjhsvdQ5biA/'
for a in sys.argv[1:]:
    i,f=a.split(':'); urllib.request.urlretrieve(B+f,f'vo/L{i}.mp3'); print('L'+i,end=' ')
