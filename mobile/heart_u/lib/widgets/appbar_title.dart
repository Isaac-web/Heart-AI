import 'package:flutter/material.dart';

import '../theme/theme_helper.dart';

class AppbarTitle extends StatelessWidget {
  AppbarTitle({super.key, required this.text, this.margin, this.onTap});

  String text;

  EdgeInsetsGeometry? margin;

  Function? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        onTap?.call();
      },
      child: Padding(
        padding: margin ?? EdgeInsets.zero,
        child: Text(
          text,
          style: theme.textTheme.bodyLarge!.copyWith(
            color: theme.colorScheme.primary,
          ),
        ),
      ),
    );
  }
}
