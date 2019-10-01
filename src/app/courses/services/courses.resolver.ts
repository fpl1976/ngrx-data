import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import { CourseEntityService } from './course-entity.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(
    private coursesService: CourseEntityService) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this.coursesService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.coursesService.getAll();
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }

}
