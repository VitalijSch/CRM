# Generated by Django 5.1.1 on 2024-10-29 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client_manager', '0002_customer_is_edit'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=50)),
                ('price', models.EmailField(max_length=254, unique=True)),
                ('total_in_stock', models.IntegerField()),
                ('is_edit', models.BooleanField(default=False)),
            ],
        ),
    ]
