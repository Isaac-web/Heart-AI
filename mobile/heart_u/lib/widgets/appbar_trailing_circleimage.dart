import 'package:flutter/material.dart';
import '../../core/app_export.dart';
import 'custom_image_view.dart';

class AppbarTrailingCircleimage extends StatelessWidget {
  AppbarTrailingCircleimage({super.key, this.imagePath, this.margin, this.onTap});

  String? imagePath;

  EdgeInsetsGeometry? margin;

  Function? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadiusStyle.circleBorder16,
      onTap: () {
        onTap?.call();
      },
      child: Padding(
        padding: margin ?? EdgeInsets.zero,
        child: CustomImageView(
          imagePath: imagePath!,
          height: 32.adaptSize,
          width: 32.adaptSize,
          fit: BoxFit.contain,
          radius: BorderRadius.circular(
            16.h,
          ),
        ),
      ),
    );
  }
}
