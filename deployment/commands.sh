sudo mkdir -p /var/www/eventaz-prototype
sudo chown -R $USER:$USER /var/www/eventaz-prototype

# Cài đặt Certbot và Nginx plugin
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Chạy Certbot để tạo chứng chỉ SSL/TLS (nếu chưa cấu hình TLS thủ công)
# Lệnh này sẽ tự tạo certificate và cấu hình tự động cập nhật (cronjob)
sudo certbot --nginx -d prototype.eventaz.space --non-interactive --agree-tos --m your-email@example.com

sudo nano /etc/nginx/sites-available/eventaz-prototype
sudo ln -s /etc/nginx/sites-available/eventaz-prototype /etc/nginx/sites-enabled/

# Phân quyền cho Nginx đọc thư mục và file tĩnh
sudo find /var/www/eventaz-prototype -type d -exec chmod 755 {} \;
sudo find /var/www/eventaz-prototype -type f -exec chmod 644 {} \;

sudo nginx -t
sudo systemctl restart nginx