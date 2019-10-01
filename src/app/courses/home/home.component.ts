import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;
  loading$: Observable<boolean>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private courseEntity: CourseEntityService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {

    const entities$ = this.courseEntity.entities$;

    this.beginnerCourses$ = entities$.pipe(
      map(courses => courses.filter(course => course.category.toLocaleUpperCase() === 'BEGINNER'))
    );

    this.advancedCourses$ = entities$.pipe(
      map(courses => courses.filter(course => course.category.toLocaleUpperCase() === 'ADVANCED'))
    );

    this.promoTotal$ = entities$
      .pipe(map(courses => courses.filter(course => course.promo).length));
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
