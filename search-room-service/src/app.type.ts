export interface RequestJSON {
  headers: any;
  body: any;
  query: any;
  params: any;
}

// > check employee auth
// > get list room
// > get list order room
// > get customer order
// > get employee support
export enum RequestStatus {
  '0_init' = 'init',
  '1_check_auth' = 'check_auth',
  '2_get_room' = 'get_room',
  '3_get_order' = 'get_order',
  '4_get_customer' = 'get_customer',
  '5_get_employee' = 'get_employee',
  '6_done' = 'done',
}
