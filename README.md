# Báo cáo
    
- Giới thiệu 
    - Ứng dụng tìm phòng khách sạn. Hệ thống cho phép tìm kiếm danh sách phòng khách sạn theo nhiều trường như: tên phòng: name ,trạng thái - status (còn trống, đang sử dụng), Giá (minPrice: thấp nhất - maxPrice: cao nhất), Loại phòng- type (đơn, đôi, Mô tả phòng: desc (ngắm hoàng hôn, có ban công, trang trí đẹp,...), Thời gian(startTime: bắt đầu - endTime: kết thúc). Ngoài ra còn hỗ trợ xem chi tiết lịch sử đặt phòng của mỗi Room.
    - Link Github: https://github.com/phamthainb/search-room

- Thành viên và đóng góp - code
    - Phạm Hồng Thái - B18DCCN599
        Search Room 
            Login
            Search Room 
            Search Order
            Export Excel
    ![Img](https://github.com/phamthainb/search-room/blob/master/docs/search-room.jpg)
        
        Room
            Get room (GET + /Room/)
            Update Room (PUT + /Room/)
            Create Room (POST + /Room/)
            Delete
    ![Img](https://github.com/phamthainb/search-room/blob/master/docs/room.jpg)

        Order
            Get order history (GET + /Order/)
            Create order (POST + /Order/)
            Update order (PUT + /Order/)
            Detele
    ![Img](https://github.com/phamthainb/search-room/blob/master/docs/order.jpg)

    - Hoàng Thái Sơn - B18DCCN511
        Export Excel
            Export (POST)
    ![Img](https://github.com/phamthainb/search-room/blob/master/docs/excel.jpg)

        Employee 
            Get Employee (GET + /Employee/)
            Check Auth  (POST + /Employee/) => true/ false + info employee
            Insert
            Delete
            Login => (token)
    ![Img](https://github.com/phamthainb/search-room/blob/master/docs/employee.jpg)

        FrontEnd
            Login
            Search Room
            Detail Room
            Export Excel
    ![Img](https://github.com/phamthainb/search-room/blob/master/docs/fe.jpg)

    - Nguyễn Mạnh Tuân - B18DCCN555
        Customer
            Get customer (GET + /Customer/)
            Create Customer  (POST + /Customer/)
            Update information (PUT + /Customer/)
            Delete 
    ![Img](https://github.com/phamthainb/search-room/blob/master/docs/customer.jpg)

        FrontEnd
            Login
            Search Room
            Detail Room
            Export Excel

- Thực thi (impl)/cài đặt: môi trường, công cụ, phiên bản, cài đặt
    - Môi trường: Node v14.0.0, npm v6.0, Mysql v8.0
    - Công cụ: Nestjs, Reactjs, Mysql
    - Cài đặt:

        ### api - port
        - customer-service: 3000
        - employee-service: 3001
        - room-service: 3002
        - order-service: 3003
        - search-room-service: 3004 (api-gateway)
        - excel-service: 3006

        ### front-end - port
        - front-end: 3005

        ### database - port
        - mysql: 3306

