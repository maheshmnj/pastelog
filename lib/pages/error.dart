import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:pastelog/themes/themes.dart';

class ErrorPage extends StatelessWidget {
  final String errorMessage;
  const ErrorPage({Key? key, this.errorMessage = "Logs not found"})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '404',
              textAlign: TextAlign.center,
              style: AppTheme.textTheme.displayLarge,
            ),
            const SizedBox(
              height: 12,
            ),
            Text(
              errorMessage,
              textAlign: TextAlign.center,
              style: AppTheme.textTheme.headlineMedium,
            ),
            const SizedBox(
              height: 32,
            ),
            TextButton(
                style: ButtonStyle(
                  maximumSize: MaterialStateProperty.all(const Size(150, 54)),
                  minimumSize: MaterialStateProperty.all(const Size(150, 54)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Text('Go Home'),
                    SizedBox(
                      width: 8,
                    ),
                    Icon(Icons.home)
                  ],
                ),
                onPressed: () => context.go('/')),
          ],
        ),
      ),
    );
  }
}
