import uuid

from django.db import migrations, models


def populate_submission_keys(apps, schema_editor):
    for model_name in ("TrialRequest", "ContactMessage"):
        model = apps.get_model("academy", model_name)
        for record in model.objects.filter(submission_key__isnull=True).iterator():
            record.submission_key = uuid.uuid4()
            record.save(update_fields=["submission_key"])


class Migration(migrations.Migration):
    dependencies = [("academy", "0001_initial")]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="site_url",
            field=models.URLField(default="https://afaaqinstitute.com", verbose_name="رابط الموقع"),
        ),
        migrations.AddField(
            model_name="trialrequest",
            name="submission_key",
            field=models.UUIDField(editable=False, null=True, unique=True, verbose_name="مفتاح منع التكرار"),
        ),
        migrations.AddField(
            model_name="contactmessage",
            name="submission_key",
            field=models.UUIDField(editable=False, null=True, unique=True, verbose_name="مفتاح منع التكرار"),
        ),
        migrations.RunPython(populate_submission_keys, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="trialrequest",
            name="submission_key",
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="مفتاح منع التكرار"),
        ),
        migrations.AlterField(
            model_name="contactmessage",
            name="submission_key",
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="مفتاح منع التكرار"),
        ),
    ]
