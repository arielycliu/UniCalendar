from enum import Enum

class status_codes(Enum):
    HTTP_200_OK = 200
    HTTP_201_Created = 201
    HTTP_204_No_Content = 204
    HTTP_400_Bad_Request = 400
    HTTP_401_Unauthorized = 401
    HTTP_403_Forbidden = 403
    HTTP_404_Not_Found = 404
    HTTP_418_Teapot = 418
    HTTP_500_Internal_Server_Error = 500
