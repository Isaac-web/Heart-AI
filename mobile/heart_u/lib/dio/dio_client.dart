import 'package:dio/dio.dart';

class DioClient {
  final Dio _dio = Dio();

  final _baseUrl = 'https://heart-disease-predictor-8.onrender.com/chat';


  Future<void> createMessage({required String message}) async {

    try {
      Response response = await _dio.post(
        _baseUrl,
        data: {
          "context": "results = 'Status: You have heart disease context = f "
                      "base on this your details; 'age': 57, 'sex': 1, 'cp': 2, "
                      "'trestbps': 156, 'chol': 300, 'fbs': 1, 'restecg': 0, "
                      "'thalach': 156, 'exang': 1, 'oldpeak': 3.2, 'slope': 0,"
                      "'ca': 0, 'thal': 3 {results}",
          "message" : message,
          "session_id": "testzakid1",
        },
      );

      print('Bot said: ${response.data}');

    } catch (e) {
      print('Error sending message: $e');
    }
  }

}
