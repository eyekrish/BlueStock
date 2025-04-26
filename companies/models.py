
from django.db import models
from django.utils import timezone
class Company(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)  # If you want to upload logo images
    price_band_min = models.DecimalField(max_digits=10, decimal_places=2,default=0.00)
    price_band_max = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    open_date = models.DateField(null=True,blank=True)
    close_date = models.DateField(null=True,blank=True)
    issue_size_crores = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    issue_type = models.CharField(max_length=100, default="Public Issue")
    listing_date = models.DateField(default=timezone.now) 


    def __str__(self):
        return self.name
