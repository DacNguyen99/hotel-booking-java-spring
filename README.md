# Hotel Booking System with Java Spring Boot

Dự án này là một hệ thống đặt phòng khách sạn được xây dựng bằng Java Spring Boot.

## Mô tả

Hệ thống cung cấp các chức năng sau:

* Quản lý phòng (thêm, sửa, xóa, tìm kiếm).
* Quản lý đơn đặt phòng (tìm kiếm, hủy).
* Đặt phòng.
* Tìm kiếm phòng trống theo ngày.

## Công nghệ sử dụng

* **Backend:** Java Spring Boot
* **Frontend:** Vite ReactJs
* **Database:** MySQL
* **API:** RESTful API
* **Build Tool:** Maven

## Hướng dẫn cài đặt và sử dụng ứng dụng

1.  Kết nối đến Instance EC2 đã tạo trên Amazon với file .pem: (Sử dụng SSH CLient - Linux như Git Bash chẳng hạn)

    ```bash
    ssh -i "hotel-booking.pem" ec2-user@ec2-13-211-169-174.ap-southeast-2.compute.amazonaws.com
    ```

2.  Chạy file .jar để khởi động server backend 

    ```bash
    java -jar hotel-booking-fullstack-0.0.1-SNAPSHOT.jar
    ```

3.  Truy cập vào trang web frontend sau: 
    [*http://hotel-booking-fullstack.s3-website-ap-southeast-2.amazonaws.com/*](http://hotel-booking-fullstack.s3-website-ap-southeast-2.amazonaws.com/)


## Phân quyền
Khi đăng ký tài khoản mới chỉ có thể mang ROLE_USER. Để sử dụng hết tính năng của hệ thống có thể sử dụng tài khoản có ROLE_ADMIN dưới đây:

**Username:** dacnguyen@gmail.com

**Password:** 123456
