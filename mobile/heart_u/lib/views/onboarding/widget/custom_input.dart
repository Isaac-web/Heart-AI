
import 'package:flutter/material.dart';

class InputCustomizado extends StatelessWidget {
  const InputCustomizado({
    super.key,
    required this.hint,
    this.obscure = false,
    required this.controller,
    this.style,
    this.icon = const Icon(Icons.person),
  });

  final String hint;
  final bool obscure;
  final Icon icon;
  final TextEditingController controller;
  final TextStyle? style;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 8, right: 8),
      child: TextField(
        controller: controller,
        obscureText: obscure,
        decoration: InputDecoration(
          icon: icon,
          border: InputBorder.none,
          hintText: hint,
          hintStyle: const TextStyle(
            color: Colors.grey,
            fontSize: 14,
          ),
        ),
      ),
    );
  }
}
