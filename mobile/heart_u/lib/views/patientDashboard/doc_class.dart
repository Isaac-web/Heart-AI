class Doctor {
  final String id;
  final String name;
  final String email;

  Doctor({required this.id, required this.name, required this.email});

  factory Doctor.fromJson(Map<String, dynamic> json) {
    return Doctor(
      id: json['_id'],
      name: json['name'],
      email: json['email'],
    );
  }
}