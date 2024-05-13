import requests
from bs4 import BeautifulSoup
import os

# Function to download image from URL
def download_image(url, folder_path):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(os.path.join(folder_path, os.path.basename(url)), 'wb') as f:
                f.write(response.content)
    except Exception as e:
        print(f"Error downloading image from {url}: {str(e)}")

# Function to scrape all images from a webpage
def scrape_all_images(url, folder_path):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            img_tags = soup.find_all('img')
            for img_tag in img_tags:
                img_url = img_tag.get('src')
                if img_url:
                    # Some URLs might be relative, so convert them to absolute URLs
                    img_url = url + img_url if img_url.startswith('/') else img_url
                    download_image(img_url, folder_path)
    except Exception as e:
        print(f"Error scraping images from {url}: {str(e)}")

# Example usage
url = 'https://www.shutterstock.com/search/cat-pointing'
folder_path = 'images'

if not os.path.exists(folder_path):
    os.makedirs(folder_path)

scrape_all_images(url, folder_path)
