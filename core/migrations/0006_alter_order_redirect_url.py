# Generated by Django 3.2.3 on 2021-08-17 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_order_redirect_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='redirect_url',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Redirect url'),
        ),
    ]